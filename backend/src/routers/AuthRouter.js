import { Router } from "express";
import { login, register } from "../controllers/AuthController.js";

export const authRouter = Router();

authRouter.post("/login", login).post("/register", register);
