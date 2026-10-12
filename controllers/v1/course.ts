import { RequestHandler } from "express";
import multer from "multer";
import { coverStorage } from "../../utils/uploader.js";
import { courseModel } from "../../models/course.js";
import { categoryModel } from "../../models/category.js";
import { sessionModel } from "../../models/session.js";
import { CommentsModel } from "../../models/comment.js";
import { enrollmentModel } from "../../models/enrollments.js";
import { userModel } from "../../models/user.js";
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

export const getAllCourse: RequestHandler = async (req, res) => {};
export const getCatCourse: RequestHandler = async (req, res) => {
  const categoryHref = req.params.categoryHref;
  const category = await categoryModel.findOne({ href: categoryHref });
  if (!category) {
    return res.status(404).json({ error: "href not valid" });
  }
  const courses = await courseModel.find({ categoryId: category._id });
  if (courses) {
    return res.status(200).json(courses);
  } else {
    res.status(200).json([]);
  }
};

export const getCourseInfo: RequestHandler = async (req, res) => {
  const courseHref = req.params.courseHref;
  const userId = res.locals.user._id;
  const course = await courseModel
    .findOne({ href: courseHref })
    .populate("creatorId", "-password")
    .populate("categoryId");
  const courseId = course?._id;
  const sessions = await sessionModel.find(courseId);
  const comments = await CommentsModel.find({
    courseId,
    Verified: true,
    isReply: false,
  }).populate({
    path: "replies",
    match: { Verified: true },
    populate: {
      path: "creatorId",
      select: "username",
    },
  });
  const students = await enrollmentModel.countDocuments({ courseId });
  const isStudent = !!(await enrollmentModel.exists({ courseId, userId }));
  return res
    .status(200)
    .json({ course, sessions, comments, students, isStudent });
};
export const removeCourse: RequestHandler = async (req, res) => {
  const courseId = res.locals.ids.courseId;
  const course = courseModel.findByIdAndDelete(courseId);
  if (!!course) {
    res.status(200).json({ message: "course deleted successfully" });
  } else {
    res.status(404).json({ error: "Course not found" });
  }
};

export const relatedCourse: RequestHandler = async (req, res) => {
  const courseHref = req.params.courseHref;
  const course = await courseModel.findOne({ href: courseHref });
  if (course) {
    res.status(404).json({ error: "course not found" });
  }
  const catCourses = await courseModel.find({ categoryId: course?.categoryId });
  const filteredCatCourses = catCourses.filter(
    (catCourse) => !catCourse._id.equals(course?._id),
  );
  res.status(200).json(filteredCatCourses);
};

export const topRatedCourse: RequestHandler = async (req, res) => {
  const courses = await courseModel.find().sort("stars");
  res.status(200).json(courses);
};
export const preOrderCourse: RequestHandler = async (req, res) => {
  const courses = await courseModel.find({ status: "preOrder" });
  res.status(201).json(courses);
};
export const coverUpload: RequestHandler = multer({
  storage: coverStorage,
  limits: { fileSize: 10000000 },
}).single("cover");
