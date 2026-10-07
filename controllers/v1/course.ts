import { RequestHandler } from "express";
import multer from "multer";
import { storage } from "../../utils/uploader.js";
import { courseModel } from "../../models/course.js";
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
    creator: user,
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

export const coverUpload: RequestHandler = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
}).single("cover");
