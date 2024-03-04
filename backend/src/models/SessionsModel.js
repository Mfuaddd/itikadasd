import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema({
  name: String,
  event_id: { type: Schema.Types.ObjectId, ref: 'events' },
  time: Date,
});

export const sessionModel = mongoose.model("sessions", sessionSchema);