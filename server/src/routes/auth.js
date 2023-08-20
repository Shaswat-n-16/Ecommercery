import { Router } from "express";
const { body } = require("express-validator");
import {
  forgotPassword,
  changePassword,
  signup,
  login,
  validateToken,
} from "../controllers/auth";
import { User } from "../db";
const router = Router();

router.post("/forgot-password", forgotPassword);

router.post(
  "/reset-password/:token",
  body("password").trim().isLength({ min: 5 }),
  changePassword
);

router.post(
  "/signup",
  body("email").custom(async (value) => await User.findByEmail(value)),
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("password").trim().isLength({ min: 5 }),
  body("firstName").trim().not().isEmpty(),
  body("lastName").trim().not().isEmpty(),
  signup
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email."),
  login
);

router.get("/validate-token/:token", validateToken);

export default router;
