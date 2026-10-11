import { RequestHandler } from "express";
import { CommentsModel } from "../../models/comment.js";

export const createComment: RequestHandler = async (req, res) => {
  const courseId = res.locals.ids.courseId;
  const userId = res.locals.user._id;

  const { body, star } = req.body;
  const newComment = await CommentsModel.create({
    body,
    star,
    creator: userId,
    courseId,
  });
  if (newComment) {
    res.status(201).json({ message: "created successfully" });
  }
};
