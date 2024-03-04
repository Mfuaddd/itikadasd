import React, { useContext, useEffect, useState } from "react";
import HeartSvg from "../../assets/icons/HeartSvg";
import ShareSvg from "../../assets/icons/ShareSvg";
import "./index.scss";
import ShareModal from "../ShareModal";
import toast, { Toaster } from "react-hot-toast";
import { tokenContext } from "../../contexts/TokenProvider";
import { wishlistContext } from "../../contexts/WishlistProvider";

function DetailWelcome({ id, detail_img, price }) {
  const { wishlist, getWishlist } = useContext(wishlistContext);
  const [inWish, setInWish] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { token } = useContext(tokenContext);

  useEffect(() => {
    setInWish(wishlist.some((item) => item._id === id));
    console.log("some");
  }, [wishlist]);

  const addWish = async (token) => {
    await fetch(`http://localhost:3000/wishlist/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    getWishlist(token);
  };

  const deleteWish = async (token) => {
    await fetch(`http://localhost:3000/wishlist/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    getWishlist(token);
  };

  const toggleWish = () => {
    if (!!token) {
      inWish ? deleteWish(token) : addWish(token);
      toast.success("Saved");
    } else {
      toast.error("You need to log in");
    }
  };

  return (
    <div className="detail-welcome">
      <Toaster />
      <div className="container-1400 detail-welcome__wrapper">
        <div>
          <img className="detail-welcome__image" src={detail_img} alt="" />
        </div>
        <div className="detail-welcome__control">
          <div className="detail-welcome__price">from {price} ₼</div>
          <div
            className={`detail-welcome__heart detail-welcome__button${
              inWish ? " active" : ""
            }`}
            onClick={toggleWish}
          >
            <HeartSvg />
          </div>
          <div
            className="detail-welcome__share detail-welcome__button"
            onClick={() => setIsShareOpen(true)}
          >
            <ShareSvg />
            {isShareOpen ? (
              <ShareModal toggleOpen={() => setIsShareOpen(false)} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailWelcome;
