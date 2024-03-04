import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  postUser,
  putUserById,
} from "../controllers/UserController.js";
import { verifyAccess } from "../middlewares/AuthMiddleware.js";

export const userRouter = Router();

userRouter
  .get("/", verifyAccess(["admin"]), getAllUsers)
  .get("/:id", verifyAccess(["admin"]), getUserById)
  .post("/", verifyAccess(["admin"]), postUser)
  .put("/:id", verifyAccess(["admin"]), putUserById)
  .delete("/:id", verifyAccess(["admin"]), deleteUserById);
