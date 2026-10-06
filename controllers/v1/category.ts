import { categoryModel } from "../../models/category.js";
import { RequestHandler } from "express";
import { categoryRouter } from "../../routes/v1/category.js";
import { checkCat as categoryValidator } from "../../validators/category.js";

export const createCat: RequestHandler = async (req, res) => {
  const isCatValid = categoryValidator(req.body);
  const { title, href } = req.body;
  if (isCatValid !== true) {
    return res.status(409).json({ message: "invalid request content" });
  }
  const document = await categoryModel.create({ title, href });
  if (document) {
    res.status(200).json({ message: "Category added successfully" });
  } else {
    res.status(500).json({ message: "something errorthingy happend" });
  }
};

export const updateCat: RequestHandler = async (req, res) => {
  const isCatValid = categoryValidator(req.body);
  if (isCatValid !== true) {
    return res.status(409).json({ message: "invalid request content" });
  }
  const id = req.params.id;
  const { title, href } = req.body;
  const updatedCat = await categoryModel.findByIdAndUpdate(id, { title, href });
  if (updatedCat) {
    res.status(200).json(updatedCat);
  } else {
    res.status(404).json({ message: "category not found" });
  }
};

export const removeCat: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const updatedCat = await categoryModel.findByIdAndDelete(id);
  if (updatedCat) {
    res.status(200).json(updatedCat);
  } else {
    res.status(500).json({ message: "something errorthingy happend" });
  }
};

export const getAllCat: RequestHandler = async (req, res) => {
  const allCat = await categoryModel.find();
  res.status(200).json(allCat);
};
