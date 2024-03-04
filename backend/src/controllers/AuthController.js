import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/UserModel.js";

const jwtKey = process.env.JWT_KEY;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(402).json({ error: "Wrong password" });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, jwtKey, {
      expiresIn: "25h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const register = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, email, password } = req.body;
    console.log({ first_name, last_name, phone_number, email, password });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new userModel({
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      { email: newUser.email, role: newUser.role },
      jwtKey,
      {
        expiresIn: "25h",
      }
    );
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
};
