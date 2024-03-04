import { Router } from "express";
import {
  deleteEventById,
  getAllEvents,
  getEventByCategory,
  getEventById,
  postEvent,
  putEventById,
} from "../controllers/EventController.js";
import { verifyAccess } from "../middlewares/AuthMiddleware.js";
import { upload } from "../middlewares/MulterMiddleware.js";
export const eventRouter = Router();



eventRouter
  .get("/", getAllEvents)
  .get("/find/:id", getEventByCategory)
  .get("/:id", getEventById)
  .post(
    "/",
    upload.fields([
      { name: "img_bg", maxCount: 1 },
      { name: "img_fr", maxCount: 1 },
      { name: "detail_img", maxCount: 1 },
      { name: "slide_img", maxCount: 4 },
    ]),
    verifyAccess(["admin"]),
    postEvent
  )
  .put(
    "/:id",
    upload.fields([
      { name: "img_bg", maxCount: 1 },
      { name: "img_fr", maxCount: 1 },
      { name: "detail_img", maxCount: 1 },
      { name: "slide_img", maxCount: 4 },
    ]),
    verifyAccess(["admin"]),
    putEventById
  )
  .delete("/:id", verifyAccess(["admin"]), deleteEventById);
