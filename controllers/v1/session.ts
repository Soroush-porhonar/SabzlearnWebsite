import { RequestHandler } from "express";
import { sessionModel } from "../../models/session.js";
import multer from "multer";
import { sessionStorage } from "../../utils/uploader.js";

export const createSession: RequestHandler<{ id: string }> = async (
  req,
  res,
) => {
  const courseId = req.params.id;
  const { title, free, time } = req.body;
  const session = await sessionModel.create({
    title,
    free,
    time,
    video: req.file?.filename,
    courseId,
  });
  if (session) {
    res.status(201).json({ message: "created successfully." });
  }
};

export const getAllSession: RequestHandler = async (req, res) => {
  const allSession = await sessionModel.find().populate("course", "name");
  return res.status(200).json(allSession);
};

export const getSessionInfo: RequestHandler = async (req, res) => {
  const session = await sessionModel.findById(req.params.id);

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  const sessions = await sessionModel.find({
    courseId: session.courseId,
  });

  return res.status(200).json({ session, sessions });
};
export const removeSession: RequestHandler = async (req, res) => {
  const sessionId = req.params.id;
  const removedSession = await sessionModel.findByIdAndDelete(sessionId);
  if (removedSession) {
    res.status(200).json({ message: "removed successfully" });
  } else {
    res.status(404).json({ error: "Id not found" });
  }
};
export const videoUpload: RequestHandler = multer({
  storage: sessionStorage,
  limits: { fileSize: 10000000000 },
}).single("video");
