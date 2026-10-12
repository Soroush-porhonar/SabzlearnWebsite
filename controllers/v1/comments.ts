import { RequestHandler } from "express";
import { CommentsModel } from "../../models/comment.js";

export const createComment: RequestHandler = async (req, res) => {
  const courseId = res.locals.ids.courseId;
  const userId = res.locals.user._id;

  const { body, star } = req.body;
  const newComment = await CommentsModel.create({
    body,
    star,
    creatorId: userId,
    courseId,
  });
  if (newComment) {
    res.status(201).json({ message: "created successfully" });
  }
};

export const removeComment: RequestHandler = async (req, res) => {
  const commentId = res.locals.ids.commentId;
  const comment = CommentsModel.findByIdAndDelete(commentId);
  if (!!comment) {
    res.status(200).json({ message: "Comment removed successfully" });
  } else {
    res.status(404).json({ message: "Comment couldnt found" });
  }
};
export const acceptComment: RequestHandler = async (req, res) => {
  const commentId = res.locals.ids.commentId;
  const comment = CommentsModel.findByIdAndUpdate({ verified: true });
  if (!!comment) {
    res.status(200).json({ message: "Comment updated to show successfully" });
  } else {
    res.status(404).json({ message: "Comment couldnt found" });
  }
};
export const rejectComment: RequestHandler = async (req, res) => {
  const commentId = res.locals.ids.commentId;
  const comment = CommentsModel.findByIdAndUpdate({ verified: false });
  if (!!comment) {
    res.status(200).json({ message: "Comment updated to hide successfully" });
  } else {
    res.status(404).json({ message: "Comment couldnt found" });
  }
};
export const replyComment: RequestHandler = async (req, res) => {
  const commentId = res.locals.ids.commentId;
  const { body, star } = req.body;
  const user = res.locals.user;

  const comment = await CommentsModel.findByIdAndUpdate(commentId, {
    verified: true,
  });
  if (!comment) {
    return res.status(404).json({ message: "Comment couldnt found" });
  }
  const courseId = comment.courseId;
  const reply = CommentsModel.create({
    courseId,
    isReply: true,
    Verified: true,
    body,
    creatorId: user._id,
    star: star,
    RepliedComId: commentId,
  });
  if (!!reply) {
    res.status(200).json({ message: "reply created successfully" });
  } else {
    res.status(400).json({ message: "reply couldnt be created" });
  }
};
