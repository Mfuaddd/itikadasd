import { userModel } from "../models/UserModel.js";

export const getWishlist = async (req, res) => {
  try {
    const decode = res.locals.decode;
    const { wishlist_id } = await userModel
      .findOne({ email: decode.email })
      .populate("wishlist_id");
    res.send(wishlist_id);
  } catch (error) {
    console.error(error.message);
  }
};

export const postWishlistById = async (req, res) => {
  try {
    const decode = res.locals.decode;
    const { id } = req.params;
    const user = await userModel.findOne({ email: decode.email });
    user.wishlist_id.push(id);
    await user.save();
    res.send("Got a POST request");
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

export const deleteWishlistById = async (req, res) => {
  try {
    const decode = res.locals.decode;
    const { id } = req.params;
    const user = await userModel.findOne({ email: decode.email });
    user.wishlist_id = user.wishlist_id.filter((wishId) => `${wishId}` !== id);
    await user.save();
    res.send("Got a DELETE request");
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

// export const getWishlistById = async (req, res) => {
//   try {
//     const decode = res.locals.decode;
//     const { id } = req.params;
//     const { wishlist_id } = await userModel.findOne({ email: decode.email });
//     const wish = wishlist_id.filter((wishId) => `${wishId}` === id);
//     const test = wish.populate("wishlist_id");
//     console.log(test);
//     res.send(wish);
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// export const putWishlistById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { first_name, last_name, phone_number, email, password, role } =
//       req.body;
//     await userModel.findByIdAndUpdate(id, {
//       first_name,
//       last_name,
//       phone_number,
//       email,
//       password,
//       role,
//     });
//     res.send("Got a PUT request");
//   } catch (error) {
//     return res.status(401).send({ error: error.message });
//   }
// };
