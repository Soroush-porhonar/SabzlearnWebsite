import { Router } from "express";
import {
  coverUpload,
  createCourse,
  getAllCourse,
  getCatCourse,
  getCourseInfo,
  preOrderCourse,
  relatedCourse,
  removeCourse,
  topRatedCourse,
  updateCourse,
} from "../../controllers/v1/course.js";
import { isToken } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/adminVerification.js";
import {
  createSession,
  getAllSession,
  getSessionInfo,
  removeSession,
  videoUpload,
} from "../../controllers/v1/session.js";
import { isIdValid } from "../../middleware/idValidation.js";
import { createEnrollment } from "../../controllers/v1/enrollment.js";

export const courseRouter = Router();

courseRouter.route("/").post(isToken, isAdmin, coverUpload, createCourse);
courseRouter.route("/").put(updateCourse);
courseRouter.route("/:courseId").delete(isIdValid, removeCourse);
courseRouter.route("/").get(getAllCourse);
courseRouter.route("/category/:categoryHref").get(getCatCourse);
courseRouter.route("/:courseHref").get(getCourseInfo);
courseRouter.route("/:courseHref/related").get(relatedCourse);
courseRouter.route("/preOrder").get(preOrderCourse);
courseRouter.route("/topRated").get(topRatedCourse);
//////////////////////////////////////////////////////////////////
courseRouter
  .route("/:courseId/session") //courseId
  .post(isToken, isAdmin, isIdValid, videoUpload, createSession);
courseRouter.route("/session").get(isToken, isAdmin, getAllSession);
courseRouter.route("/:courseHref/:sessionId").get(isIdValid, getSessionInfo); //sessionId
courseRouter
  .route("/session/:sessionId") //sessionId
  .delete(isToken, isAdmin, isIdValid, removeSession);

//////////////////////////////////////////////////////
courseRouter
  .route("/:courseId/enroll") //courseId
  .post(isToken, isIdValid, createEnrollment);
