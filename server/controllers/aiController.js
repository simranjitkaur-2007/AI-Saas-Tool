import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Lazy-load pdf-parse only when needed (inside resumeReview)
// to avoid crashing all routes on Vercel due to @napi-rs/canvas dependency
let pdfParse = null;
function getPdfParse() {
  if (!pdfParse) {
    pdfParse = require("pdf-parse");
  }
  return pdfParse;
}

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;
    if (plan != "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

   const response = await AI.chat.completions.create({
      model: "gemini-3.6-flash",
      messages: [
        {
          role: "system",
          content: "You are a professional article writer. Always write complete, detailed articles that fully meet the requested word count. Use markdown formatting with proper headings (##), subheadings (###), bold text, bullet points, and paragraphs.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: (length || 2000) + 500,
    });
    const content = response.choices[0].message.content;

    await sql` INSERT INTO creations (user_id, prompt, content, type ) 
    VALUES (${userId}, ${prompt}, ${content}, 'article')`;

    if (plan != "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
export const generateBlogTile = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;
    if (plan != "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-3.6-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
    });
    const content = response.choices[0].message.content;

    await sql` INSERT INTO creations (user_id, prompt, content, type ) 
    VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

    if (plan != "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
export const generateImages = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;
    if (plan != "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for pro subscriptions.",
      });
    }

    const response = await AI.images.generate({
      model: "imagen-3.0-generate-002",
      prompt: prompt,
      n: 1,
      response_format: "b64_json",
      size: "1024x1024",
    });

    const base64Image = `data:image/png;base64,${response.data[0].b64_json}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql` INSERT INTO creations (user_id, prompt, content, type, publish ) 
    VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (plan != "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for pro subscriptions.",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type) 
    VALUES (${userId}, 'Remove Background from image', ${secure_url}, 'image')`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    if (plan != "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for pro subscriptions.",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);
    const imageUrl = cloudinary.url(public_id, {
      transformation: [
        {
          effect: `gen_remove:prompt_${object}`,
        },
      ],
      resource_type: "image",
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type) 
    VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (plan != "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for pro subscriptions.",
      });
    }
    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB).",
      });
    }
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfParser = getPdfParse();
    const pdfData = await pdfParser(dataBuffer);

    const prompt = `Review the following resume and provide the constructive feedback on it strengths, weaknesses and areas for improvement. Resume Content:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-3.6-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      reasoning_effort: "low",
    });
    const content = response.choices[0].message.content;

    await sql` INSERT INTO creations (user_id, prompt, content, type) 
    VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};