import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./index.scss";
import "swiper/scss";
import ArrowSvg from "../../assets/icons/ArrowSvg";
import { getFetch } from "../../helpers/FetchHelper";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const [Events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFetch("http://localhost:3000/events", setEvents);
  }, []);

  return (
    <div className="welcome">
      <div className="container-1400 welcome__wrapper">
        <Swiper
          className="welcome__swiper"
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".welcome__swiper__next",
            prevEl: ".welcome__swiper__prev",
            disabledClass: "swiper-button-disabled",
          }}
          loop={true}
        >
          {Events &&
            Events.map((item) => {
              console.log(item);
              if (!!item.slide_img) {
                return (
                  <SwiperSlide key={item._id}>
                    <img
                      onClick={() => navigate(`/detail/${item._id}`)}
                      className="no-select"
                      src={item.slide_img}
                      alt={item.name}
                    />
                  </SwiperSlide>
                );
              }
            })}
        </Swiper>
        <div className="welcome__swiper__prev welcome__swiper__button no-select">
          <ArrowSvg />
        </div>
        <div className="welcome__swiper__next welcome__swiper__button no-select">
          <ArrowSvg />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
