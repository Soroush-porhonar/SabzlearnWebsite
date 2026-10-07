import { Router } from "express";
import {
  coverUpload,
  createCourse,
  deleteCourse,
  getAllCourse,
  updateCourse,
} from "../../controllers/v1/course.js";
import { isToken } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/adminVerification.js";
export const courseRouter = Router();

courseRouter.route("/").post(isToken, isAdmin, coverUpload, createCourse);
courseRouter.route("/").put(updateCourse);
courseRouter.route("/").delete(deleteCourse);
courseRouter.route("/").get(getAllCourse);
