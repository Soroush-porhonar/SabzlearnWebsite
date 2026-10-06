import Express from "express";
import {
  createCat,
  getAllCat,
  removeCat,
  updateCat,
} from "../../controllers/v1/category.js";
import { isIdValid } from "../../middleware/idValidation.js";

export const categoryRouter = Express.Router();

categoryRouter.route("/").post(createCat).get(getAllCat);
categoryRouter
  .route("/:id")
  .put(isIdValid, updateCat)
  .delete(isIdValid, removeCat);
