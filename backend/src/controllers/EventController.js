import { host } from "../../index.js";
import { categoriesModel } from "../models/CategoriesModel.js";
import { eventModel } from "../models/EventModel.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find({});
    res.send(events);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventModel.findById(id);
    res.send(event);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const getEventByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventModel.find({ category_id: id });
    res.send(event);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const postEvent = async (req, res) => {
  try {
    const { name, price, date, place_id, about, age, category_id, language } =
      req.body;
    const { img_bg, img_fr, detail_img, slide_img } = req.files;
    const newEvent = eventModel({
      name,
      price,
      date,
      place_id,
      about,
      age,
      category_id,
      language,
      img_bg: img_bg && `${host}public/${img_bg[0].filename}`,
      img_fr: img_fr && `${host}public/${img_fr[0].filename}`,
      detail_img: detail_img && `${host}public/${detail_img[0].filename}`,
      slide_img: slide_img && `${host}public/${slide_img[0].filename}`,
    });
    await newEvent.save();
    res.send("Got a POST request");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ error: error.message });
  }
};

export const putEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, date, place_id, about, age, category_id, language } =
      req.body;
    const { img_bg, img_fr, detail_img, slide_img } = req.files;
    const old = await eventModel.findById(id);
    await eventModel.findByIdAndUpdate(id, {
      name,
      price,
      date,
      place_id,
      about,
      age,
      category_id,
      language,
      img_bg: !img_bg
        ? old.img_bg
        : img_bg && `${host}public/${img_bg[0].filename}`,
      img_fr: !img_fr
        ? old.img_fr
        : img_fr && `${host}public/${img_fr[0].filename}`,
      detail_img: !detail_img
        ? old.detail_img
        : detail_img && `${host}public/${detail_img[0].filename}`,
      slide_img: !slide_img
        ? old.slide_img
        : slide_img && `${host}public/${slide_img[0].filename}`,
    });
    res.send("Got a PUT request");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

export const deleteEventById = async (req, res) => {
  try {
    const { id } = req.params;
    await eventModel.findByIdAndDelete(id);
    res.send("Got a DELETE request");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
