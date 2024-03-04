import React, { useContext } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { fetchContext } from "../../contexts/FetchProvider";

function Card({ item }) {
  const { apiPlaces } = useContext(fetchContext);
  const navigate = useNavigate();

  const toNormalDate = (time) => {
    const t = time.split(",")
    return new Date(+t[0]).toDateString().slice(4);
  };

  const findName = (array, id) => {
    return array.find((item) => item._id === id)?.name;
  };

  return (
    <div className="card" onClick={() => navigate(`/detail/${item._id}`)}>
      <div className="card__front">
        <img className="card__img-bg" src={item?.img_bg} alt="background" />
        <img className="card__img-fr" src={item?.img_fr} alt="image" />
        <div className="card__price">from {item?.price}₼</div>
      </div>
      <div className="card__text">
        <div className="card__title">{item?.name}</div>
        <div className="card__info">
          {toNormalDate(item?.date)}
          <span className="card__info__place">
            • {findName(apiPlaces, item.place_id)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
