import { host } from "../../index.js";
import { placeModel } from "../models/PlaceModel.js";

export const getAllPlaces = async (req, res) => {
  try {
    const places = await placeModel.find({});
    res.send(places);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const getPlaceById = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await placeModel.findById(id);
    res.send(place);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const postPlace = async (req, res) => {
  try {
    const { name, location, phone, mobile, address, link } = req.body;
    const image = req.file;
    const newPlace = placeModel({
      name,
      location,
      phone,
      mobile,
      address,
      link,
      image: `${host}public/${image.filename}`,
    });
    await newPlace.save();
    res.send("Got a POST request");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const putPlaceById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, phone, mobile, link, address } = req.body;
    const image = req.file;
    console.log(req.file, req.files);
    const old = await placeModel.findById(id);
    await placeModel.findByIdAndUpdate(id, {
      name,
      image: !image ? old.image : `${host}public/${image.filename}`,
      location,
      phone,
      mobile,
      address,
      link,
    });
    res.send("Got a PUT request");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const deletePlaceById = async (req, res) => {
  try {
    const { id } = req.params;
    await placeModel.findByIdAndDelete(id);
    res.send("Got a DELETE request");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
