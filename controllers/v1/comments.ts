import { RequestHandler } from "express";
import { CommentsModel } from "../../models/comment.js";

export const createComment: RequestHandler = async (req, res) => {
  const courseId = req.params.id;
  const userId = res.locals.user._id;

  const { body, star } = req.body;
  const newComment = await CommentsModel.create({
    body,
    star,
    creator: userId,
  });
  if (newComment) {
    res.status(201).json({ message: "created successfully" });
  }
};
