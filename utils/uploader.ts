import multer from "multer";
import crypto from "crypto";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/courses/covers");
  },

  filename: (req, file, cb) => {
    const hashedFilename = crypto
      .createHash("SHA256")
      .update(file.originalname)
      .digest("hex");
    cb(null, `${Date.now()}-${hashedFilename}`);
  },
});

export const upload = multer({ storage });
