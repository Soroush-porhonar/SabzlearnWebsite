import { RequestHandler } from "express";
import { enrollmentModel } from "../../models/enrollments.js";

export const createEnrollment: RequestHandler = async (req, res) => {
  const courseId = res.locals.ids.courseId;
  const userId = res.locals.user._id;
  const price = req.body.price;
  const exist = await enrollmentModel.findOne({ courseId, userId });
  if (exist) {
    return res
      .status(409)
      .json({ error: "course already be this user purchased" });
  }
  const enrollment = await enrollmentModel.create({ courseId, userId, price });
  if (enrollment) {
    res
      .status(201)
      .json({ message: "course purchase by this user successfully" });
  }
};
