# AI SaaS Tool ✨

A full-stack AI-powered SaaS platform built with the **PERN stack** (PostgreSQL, Express, React, Node.js). It brings together a suite of AI content tools — article writing, image generation, background/object removal, and resume review — behind a subscription-gated, authenticated experience.

> This project is being built and documented as a daily learning journey. See the commit history for day-by-day progress.

## Features

- 📝 **Article Generator** – Generate long-form articles from a prompt using Google Gemini
- 🏷️ **Blog Title Generator** – Generate catchy blog titles
- 🖼️ **AI Image Generation** – Create images from text prompts (ClipDrop AI)
- 🎨 **Background Removal** – Remove the background from an uploaded image
- 🧽 **Object Removal** – Remove unwanted objects from an image
- 📄 **Resume Review** – Get AI-driven feedback on an uploaded resume (PDF)
- 🌐 **Community Feed** – Browse published creations, like/unlike shared content
- 📊 **Dashboard** – View your own creation history
- 🔐 **Authentication & Plans** – Sign-up/sign-in via Clerk, with free vs. premium usage limits

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router DOM
- Tailwind CSS
- Clerk (`@clerk/clerk-react`) for auth
- Axios, React Hot Toast, React Markdown, Lucide React icons

**Backend**
- Node.js + Express 5
- Clerk (`@clerk/express`) for auth & subscription plan checks
- Neon (serverless PostgreSQL) via `@neondatabase/serverless`
- Google Gemini API (`@google/genai`) for text generation
- ClipDrop API for image generation
- Cloudinary for image storage/hosting
- Multer for file uploads
- pdf-parse for resume parsing

**Deployment:** Vercel (both client and server)

## Project Structure

```
AI-Saas-Tool/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Navbar, Sidebar, Footer, AITool, Plan, Testimonial, etc.
│   │   ├── pages/          # Home, Dashboard, WriteArticle, BlogTitles,
│   │   │                   # GenerateImages, RemoveBackground, RemoveObject,
│   │   │                   # ReviewResume, Community, Layout
│   │   └── main.jsx
│   └── package.json
├── server/                 # Express backend
│   ├── configs/            # cloudinary.js, db.js, multer.js
│   ├── controllers/        # aiController.js, userController.js
│   ├── middleware/         # auth.js (Clerk auth + free/premium usage gate)
│   ├── routes/             # aiRoutes.js, userRoutes.js
│   └── server.js
└── readme.md               # Original build journal / dev notes
```

## API Overview

All routes below require Clerk authentication (`requireAuth`) and pass through the custom `auth` middleware, which attaches the user's plan (`free`/`premium`) and free-usage count to the request.

**AI routes** — `/api/ai`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/generate-article` | Generate an article from a prompt |
| POST | `/generate-blog-title` | Generate a blog title from a prompt |
| POST | `/generate-images` | Generate an image from a prompt |
| POST | `/remove-background` | Remove background from an uploaded image |
| POST | `/remove-object` | Remove an object from an uploaded image |
| POST | `/resume-review` | Review an uploaded resume (PDF) |

**User routes** — `/api/user`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-user-creations` | Get the current user's creation history |
| GET | `/get-published-creations` | Get all published/community creations |
| POST | `/toggle-like-creations` | Like/unlike a published creation |

## Database Schema

Creations are stored in Neon (PostgreSQL):

```sql
CREATE TABLE creations(
  id SERIAL PRIMARY KEY,
  user_Id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  publish BOOLEAN DEFAULT FALSE,
  likes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A [Neon](https://neon.tech) PostgreSQL database
- A [Clerk](https://clerk.com) application (for auth + plans)
- API keys for [Google Gemini](https://ai.google.dev/), [ClipDrop](https://clipdrop.co/apis), and [Cloudinary](https://cloudinary.com/)

### 1. Clone the repository
```bash
git clone https://github.com/simranjitkaur-2007/AI-Saas-Tool.git
cd AI-Saas-Tool
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file in `server/` with:
```env
DATABASE=your_neon_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Run the backend:
```bash
npm start        # production
npm run dev      # development, with nodemon
```

### 3. Frontend setup
```bash
cd ../client
npm install
npm run dev
```

The client will start on Vite's default dev server (typically `http://localhost:5173`), and the API server defaults to `http://localhost:3000` (configurable via `PORT`).

## Deployment

Both `client` and `server` include a `vercel.json` and are set up to be deployed independently on [Vercel](https://vercel.com).

## Roadmap / Notes

- Subscription plans are managed through Clerk (`premium` vs `free`), gating access to certain tools once free usage is exhausted.
- See `readme.md` for the author's running build log and setup notes (linters, package choices, etc.).

## License

ISC (see `server/package.json`). No license file has been added at the repository root yet — consider adding one if you plan to open this project up for contributions.

## Author

[simranjitkaur-2007](https://github.com/simranjitkaur-2007)#content below is for my reference.
disclaimer-I started working on this project from 20 july but got the idea of sharing my jouney on 18 july.hence i am making             this repo today and whatever i code, i will update it daily.
          -No use of AI for writing any sort of code has been made.

i will create an AI SAAS tool using PERN stack(posgtre SQL,express,react and node.js).
it includes multiple ai tools like 
1. article generator
2. blog title
3. generate images
4. remove background
5. remove object
6. review resume

i will add subscription option such that some tools are only accessible upon subscription
for user signin and signup,i have used clerk for autentication.

all the data generated by ai will be stored in neon(database)

i will deploy it on VERCEL.

since i am making react project hence in terminal, we will put the command 'npm create vite@latest'
diff b/w ESlint and OXlint
ESlint-ESLint is the long-standing, industry-standard linter for JavaScript.
You use it to:
Catch common programming mistakes before running your code.
Enforce a consistent coding style across a team.
Automatically fix many issues.
Support frameworks like React, Vue, Next.js, Angular, etc., through a huge plugin ecosystem

Oxlint-Oxlint is a newer linter written in Rust as part of the Oxc toolchain.

node_modules has all the dependencies which we have download for the website.

then npm install react-router-dom (when we want to open another page without the website actually getting reloaded)

npm install lucide-react (we can use icons in the proj)
we will use tailwind css hence open vite+tailwind on chrome and follow the step to install it 

BACKEND=>
npm install express 
dotenv cors axios cloudinary multer
cors-to connect backend with any frontend.
axios-to make api calls.
cloudinary-to stroe the images
multer-to upload the image



npm install --save-dev nodemon


we will add type=mdule here as default is commonjs but find out the reason?? in package.json

terminal command to run backend
npm install
npm start



neon-sql table
CREATE TABLE creations(
  id SERIAL PRIMARY KEY,
  user_Id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  publish BOOLEAN DEFAULT FALSE,
  likes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
  )

from clerk we will do express quickstart and get the api key from there
  npm install @clerk/express


  to generate image ,we used clipdropAI


  connecting frontend with backend
  npm install axiom
  npm install react-hot-toast
