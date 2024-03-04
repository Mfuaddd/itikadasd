import mongoose, { Schema } from "mongoose";

const sectorSchema = new Schema({
  name: String,
  session_id: { type: Schema.Types.ObjectId, ref: 'sessions' },
  spaces: Number,
  isEmpty: Number,
});

export const sectorModel = mongoose.model("sectors", sectorSchema);