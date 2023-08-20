import { Router } from "express";
const { body } = require("express-validator");
import { getAllProduct, getProductByCategory } from "../controllers/product";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

router.get("/", getAllProduct);

router.get("/:id", getProductByCategory);

router.post("/", isAuthenticated, createProduct);

export default router;
