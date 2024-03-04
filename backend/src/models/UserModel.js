import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  phone_number: String,
  email: {
    type: String,
    unique: true,
  },
  wishlist_id: [{ type: Schema.Types.ObjectId, ref: "events" }],
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

export const userModel = mongoose.model("users", userSchema);
