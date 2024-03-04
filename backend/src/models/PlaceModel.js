import mongoose, { Schema } from "mongoose";

const placeSchema = new Schema({
  name: String,
  image: String,
  location: String,
  link:String,
  phone: String,
  mobile: String,
  address: String,
});

export const placeModel = mongoose.model("places", placeSchema);
