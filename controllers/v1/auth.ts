import { userModel } from "../../models/user.js";
import type { RequestHandler } from "express";
import {checkRegister as registerValidator} from "./../../validators/auth.js";
import bcrypt from "bcrypt"

export const register: RequestHandler = async (req, res) => {
  const validationResult = registerValidator(req.body);

  if (validationResult !== true) {
    res.status(422).json({ errors: validationResult });
    
  }else{
    const{username, phone, email, password}=req.body
    const userExists = await userModel.findOne({$or:[{username}, {email}]})
    if (userExists){
        res.status(409).json({message:'username or email already exists.'})
    }else{
        const userCount = await userModel.countDocuments();
        const hashpassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({username, email, phone, password : hashpassword, role:userCount>0 ? "user": "admin"})
    }
  }

  // Continue registration...
};
export function login() {}
export function getMe() {}
