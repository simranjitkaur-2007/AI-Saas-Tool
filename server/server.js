import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, clerkClient, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCoudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
await connectCoudinary()

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Server is live!"));
app.use(requireAuth());
app.use('/api/ai', aiRouter);
app.use('/api/user', userRouter);


const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

export default app;