import { Router } from "express";
import { verifyAccess } from "../middlewares/AuthMiddleware.js";
import {
  deleteSessionById,
  getAllSessions,
  getSessionById,
  postSession,
  putSessionById,
} from "../controllers/SessionsController.js";

export const sessionRouter = Router();

sessionRouter
  .get("/", getAllSessions)
  .get("/:id", getSessionById)
  .post("/", verifyAccess(["admin"]), postSession)
  .put("/:id", verifyAccess(["admin"]), putSessionById)
  .delete("/:id", verifyAccess(["admin"]), deleteSessionById);
