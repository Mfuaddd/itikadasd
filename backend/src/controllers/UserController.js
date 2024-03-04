import { userModel } from "../models/UserModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (error) {
    console.error(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    res.send(user);
  } catch (error) {
    console.error(error.message);
  }
};

export const postUser = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, email, password, role } =
      req.body;
    const newUser = userModel({
      first_name,
      last_name,
      phone_number,
      email,
      password,
      role,
    });
    await newUser.save();
    res.send("Got a POST request");
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

export const putUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone_number, email, password, role } =
      req.body;
    await userModel.findByIdAndUpdate(id, {
      first_name,
      last_name,
      phone_number,
      email,
      password,
      role,
    });
    res.send("Got a PUT request");
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.send("Got a DELETE request");
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};
