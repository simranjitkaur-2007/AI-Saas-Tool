import multer from "multer";
import os from "os";
import path from "path";

// Use /tmp for file uploads on Vercel (serverless filesystem is read-only)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

export const upload = multer({storage})