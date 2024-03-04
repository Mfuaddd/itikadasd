import { Router } from "express";
import { verifyAccess } from "../middlewares/AuthMiddleware.js";
import {
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  postCategory,
  putCategoryById,
} from "../controllers/CategoriesController.js";

export const categoriesRouter = Router();

categoriesRouter
  .get("/", getAllCategories)
  .get("/:id", getCategoryById)
  .post("/", verifyAccess(["admin"]), postCategory)
  .put("/:id", verifyAccess(["admin"]), putCategoryById)
  .delete("/:id", verifyAccess(["admin"]), deleteCategoryById);
