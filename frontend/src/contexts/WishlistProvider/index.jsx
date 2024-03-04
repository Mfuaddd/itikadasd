import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getFetch } from "../../helpers/FetchHelper";
import { getCookie, setCookie } from "../../helpers/CookieHelper";

export const wishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const getWishlist = async (token) => {
    if (token) {
      await getFetch("http://localhost:3000/wishlist", setWishlist, token);
    }
  };

  const data = {
    wishlist,
    getWishlist,
  };

  return (
    <wishlistContext.Provider value={data}>{children}</wishlistContext.Provider>
  );
}

export default WishlistProvider;
