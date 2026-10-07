import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  updateCourse,
} from "../../controllers/v1/course.js";
export const courseRouter = Router();

courseRouter.route("/").post(createCourse);
courseRouter.route("/").post(updateCourse);
courseRouter.route("/").post(deleteCourse);
courseRouter.route("/").post(getAllCourse);
