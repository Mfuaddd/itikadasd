import { Router } from "express";
import { deleteWishlistById, getWishlist, postWishlistById } from "../controllers/WishlistController.js";
import { verifyAccess } from "../middlewares/AuthMiddleware.js";

export const wishlistRouter = Router();

wishlistRouter
  .get("/", verifyAccess(["user", "admin"]), getWishlist)
  .post("/:id", verifyAccess(["user", "admin"]), postWishlistById)
  .delete("/:id", verifyAccess(["user", "admin"]), deleteWishlistById);
  // .get("/:id", verifyAccess(["user", "admin"]), getWishlistById)
  // .put("/:id", verifyAccess(["user", "admin"]), putUserById)
