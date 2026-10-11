import { RequestHandler } from "express";
import multer from "multer";
import { coverStorage } from "../../utils/uploader.js";
import { courseModel } from "../../models/course.js";
import { categoryModel } from "../../models/category.js";
import { sessionModel } from "../../models/session.js";
import { CommentsModel } from "../../models/comment.js";
import { enrollmentModel } from "../../models/enrollments.js";
export const createCourse: RequestHandler = async (req, res) => {
  const {
    title,
    description,
    support,
    href,
    stars,
    price,
    discount,
    categoryId,
    status,
  } = req.body;
  const user = res.locals.user;
  const document = await courseModel.create({
    title,
    description,
    support,
    href,
    stars,
    price,
    discount,
    categoryId,
    creatorId: user,
    status,
    cover: req.file?.filename,
  });
  const populatedDocument = await document.populate("creator", "-password");
  if (populatedDocument) {
    res.status(201).json(populatedDocument);
  }
};
export const updateCourse: RequestHandler = async (req, res) => {};
export const deleteCourse: RequestHandler = async (req, res) => {};
export const getAllCourse: RequestHandler = async (req, res) => {};
export const getCatCourse: RequestHandler = async (req, res) => {
  const href = req.params.href;
  const category = await categoryModel.findOne({ href });
  if (!category) {
    return res.status(404).json({ error: "href not valid" });
  }
  const courses = await courseModel.find({ href });
  if (courses) {
    return res.status(200).json(courses);
  } else {
    res.status(200).json([]);
  }
};
export const getCourseInfo: RequestHandler = async (req, res) => {
  const courseId = res.locals.ids.courseId;
  const course = await courseModel
    .findById(courseId)
    .populate("creatorId", "-password")
    .populate("categoryId");
  const sessions = await sessionModel.find(courseId);
  const comments = await CommentsModel.find({ courseId, isVerified: true });
  const students = await enrollmentModel.find(courseId).countDocuments;
  return res.status(200).json({ course, sessions, comments, students });
};

export const coverUpload: RequestHandler = multer({
  storage: coverStorage,
  limits: { fileSize: 10000000 },
}).single("cover");
