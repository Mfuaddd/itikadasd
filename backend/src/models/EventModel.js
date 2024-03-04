import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  name: String,
  price: Number,
  date: String,
  place_id: { type: Schema.Types.ObjectId, ref: "places" },
  about: String,
  age: Number,
  category_id: { type: Schema.Types.ObjectId, ref: "categories" },
  language: String,
  img_bg: String,
  img_fr: String,
  detail_img: String,
  slide_img: String,
});

export const eventModel = mongoose.model("events", eventSchema);
