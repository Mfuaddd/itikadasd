import { Router } from "express";
import { verifyAccess } from "../middlewares/AuthMiddleware.js";
import {
  deleteSectorById,
  getAllSectors,
  getSectorById,
  postSector,
  putSectorById,
} from "../controllers/SectorController.js";

export const sectorRouter = Router();

sectorRouter
  .get("/", getAllSectors)
  .get("/:id", getSectorById)
  .post("/", verifyAccess(["admin"]), postSector)
  .put("/:id", verifyAccess(["admin"]), putSectorById)
  .delete("/:id", verifyAccess(["admin"]), deleteSectorById);
