import express from "express";
import mongoose, { Schema } from "mongoose";
import multer from "multer";
import cors from "cors";
import "dotenv/config";
import { eventRouter } from "./src/routers/EventRouter.js";
import { userRouter } from "./src/routers/UserRouter.js";
import { authRouter } from "./src/routers/AuthRouter.js";
import { categoriesRouter } from "./src/routers/CategoriesRouter.js";
import { placeRouter } from "./src/routers/PlaceRouter.js";
import { sectorRouter } from "./src/routers/SectorRouter.js";
import { wishlistRouter } from "./src/routers/WishlistRouter.js";

const app = express();
const port = process.env.PORT;
const dbKey = process.env.DB_KEY;
export const host = "http://localhost:3000/";

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use("/public", express.static("public"));

app.use("/events", eventRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/categories", categoriesRouter);
app.use("/places", placeRouter);
app.use("/sectors", sectorRouter);
app.use("/sessions", sectorRouter);
app.use("/wishlist", wishlistRouter);

await mongoose
  .connect(dbKey)
  .then(() => console.log("Connected"))
  .catch(() => console.log("Not Connected"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
