import { json } from "express";
import { User } from "../db/schema/User";
import hashPassword from "../utils/auth.utils";
import { generateAuthToken } from "../utils/token.utils";

export const signup = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User Already Exists",
        sucess: false,
        data: null,
      });
    }
    const hashedPassword = await hashPassword(password);
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      hashedPassword,
    });
    return res.status(200).json({
      message: "User Created Successfully",
      success: true,
      data: createdUser,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      sucess: false,
      data: null,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User Doesn't Exists",
        sucess: false,
        data: null,
      });
    }
    const isMatched = comparePassword(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
        data: null,
      });
    }
    const token = generateAuthToken({
      id: user._id,
      intials: user.intials,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    });
    return res.status(201).json({
      message: "token Created Successfully",
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          intials: user.intials,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: error.message,
      sucess: false,
      data: null,
    });
  }
};
