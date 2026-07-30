import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from './routes/aiRoutes.js';
import userRouter from './routes/userRoutes.js';
import connectcloudinary from './configs/cloudinary.js';

const app = express();
await connectcloudinary()
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

 app.get('/',(req,res)=>res.send("Server is live"))

 //only login user can access
 app.use(requireAuth())
 app.use('/api/ai',aiRouter)
 app.use('/api/user',userRouter)
 const PORT=process.env.PORT || 3000;

 app.listen(PORT,()=>
console.log("server is running on port",PORT)
)
 
