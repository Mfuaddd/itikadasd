import { sectorModel } from "../models/SectorModel.js";

export const getAllSectors = async (req, res) => {
  try {
    const sectors = await sectorModel.find({});
    res.send(sectors);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const getSectorById = async (req, res) => {
  try {
    const { id } = req.params;
    const sector = await sectorModel.findById(id);
    res.send(sector);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const postSector = async (req, res) => {
  try {
    const { name, session_id, spaces, isEmpty } = req.body;
    const newSector = sectorModel({ name, session_id, spaces, isEmpty });
    await newSector.save();
    res.send("Got a POST request");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const putSectorById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, session_id, spaces, isEmpty } = req.body;
    await sectorModel.findByIdAndUpdate(id, {
      name,
      session_id,
      spaces,
      isEmpty,
    });
    res.send("Got a PUT request");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const deleteSectorById = async (req, res) => {
  try {
    const { id } = req.params;
    await sectorModel.findByIdAndDelete(id);
    res.send("Got a DELETE request");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
