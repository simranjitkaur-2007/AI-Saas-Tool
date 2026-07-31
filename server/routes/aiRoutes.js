import express from "express";
import { generateArticle, generateBlogTile, generateImages, removeImageBackground, removeImageObject, resumeReview } from "../controllers/aiController.js";
import { upload } from "../configs/multer.js";
import { auth } from "../middleware/auth.js";

const aiRouter = express.Router();
aiRouter.post('/generate-article', auth, generateArticle)
aiRouter.post('/generate-blog-title', auth, generateBlogTile)
aiRouter.post('/generate-images', auth, generateImages)
aiRouter.post('/remove-background', auth, upload.single('image'), removeImageBackground)
aiRouter.post('/remove-object', auth, upload.single('image'), removeImageObject)
aiRouter.post('/resume-review', auth, upload.single('resume'), resumeReview)

export default aiRouter