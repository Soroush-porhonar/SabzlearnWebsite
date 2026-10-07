import multer from "multer";
import crypto from "crypto";
import { fileURLToPath } from "url";

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      fileURLToPath(new URL("../public/courses/covers", import.meta.url)),
    );
  },

  filename: (req, file, cb) => {
    const hashedFilename = crypto
      .createHash("SHA256")
      .update(file.originalname)
      .digest("hex");
    cb(null, `${Date.now()}-${hashedFilename}`);
  },
});
