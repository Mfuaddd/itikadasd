import { sessionModel } from "../models/SectorModel.js";

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await sessionModel.find({});
    res.send(sessions);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await sessionModel.findById(id);
    res.send(session);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const postSession = async (req, res) => {
  try {
    const { name, event_id, time } = req.body;
    const newSession = sessionModel({ name, event_id, time });
    await newSession.save();
    res.send("Got a POST request");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const putSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, event_id, time } = req.body;
    await sessionModel.findByIdAndUpdate(id, { name, event_id, time });
    res.send("Got a PUT request");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const deleteSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    await sessionModel.findByIdAndDelete(id);
    res.send("Got a DELETE request");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
