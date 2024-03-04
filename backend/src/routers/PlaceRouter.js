import { Router } from "express";
import { verifyAccess } from "../middlewares/AuthMiddleware.js";
import {
  deletePlaceById,
  getAllPlaces,
  getPlaceById,
  postPlace,
  putPlaceById,
} from "../controllers/PlaceController.js";
import { upload } from "../middlewares/MulterMiddleware.js";

export const placeRouter = Router();

placeRouter
  .get("/", getAllPlaces)
  .get("/:id", getPlaceById)
  .post("/", upload.single("image"), verifyAccess(["admin"]), postPlace)
  .put("/:id", upload.single("image"), verifyAccess(["admin"]), putPlaceById)
  .delete("/:id", verifyAccess(["admin"]), deletePlaceById);
