import { User } from "../db/schema/User";
import { hashPassword, comparePassword } from "../utils/auth.utils";
import {
  generateResetToken,
  generateAuthToken,
  verifyAuthToken,
  verifyResetToken,
} from "../utils/token.utils";
import { validationResult } from "express-validator";

export const validateToken = async (req, res, next) => {
  try {
    // check for validation errors
    const { token } = req.params;
    const decoded = await verifyAuthToken(token);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
        data: null,
      });
    }
    return res.status(201).json({
      message: "token validated successfully",
      success: true,
      data: decoded,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

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

export const forgotPassword = async (req, res, next) => {
  try {
    // check if user exists in the DB
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
        data: null,
      });
    }
    // generate a token and send email
    const token = generateResetToken({
      email,
    });
    const resetPasswordLink = `http://localhost:3000/reset-password/${token}`;
    // send the email
    return res.status(200).json({
      message: "Reset password link sent to email",
      success: true,
      data: {
        resetPasswordLink,
        token,
      },
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        data: errors.array(),
      });
    }
    const { password } = req.body;
    const { token } = req.params;
    console.log(token);
    // verify the token
    const payload = verifyResetToken(token);
    if (!payload) {
      return res.status(400).json({
        message: "Invalid or expired token",
        success: false,
        data: null,
      });
    }
    const { email } = payload;
    const user = await User.findOne({ email });
    user.password = password;
    await user.save();
    // await User.findOneAndUpdate({ email }, { password });

    return res.status(200).json({
      message: "Password updated successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
