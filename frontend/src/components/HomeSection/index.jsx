import React, { useEffect, useState } from "react";
import "./index.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/scss";
import ArrowSvg from "../../assets/icons/ArrowSvg";
import Card from "../Card";
import { getFetch } from "../../helpers/FetchHelper";

function HomeSection({ section, header, endpoint, bg }) {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    getFetch(`http://localhost:3000/${endpoint}`, setApiData);
  }, []);

  if (apiData.length > 0) {
    return (
      <div className="home-section" style={bg ? null : { background: "none" }}>
        <div className="home-section__header container-1200">
          <h3>{header}</h3>
        </div>
        <div className="home-section__body">
          <Swiper
            className="home-section__swiper"
            modules={[Navigation]}
            spaceBetween={40}
            centeredSlides={true}
            slidesPerView={"auto"}
            navigation={{
              nextEl: `.${section}__swiper__next`,
              prevEl: `.${section}__swiper__prev`,
              disabledClass: "swiper-button-disabled",
            }}
            loop={true}
            breakpoints={{
              1536: {
                centeredSlides: false,
              },
              // 768: {
              //   slidesPerView: "auto",
              // },
              256: {
                centeredSlides: true,
                slidesPerView: 1,
              },
            }}
          >
            {apiData.map((item) => (
              <SwiperSlide
                key={item._id}
                className="home-section__swiper__slide"
              >
                <Card item={item} width={"540px"} height={"600px"} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className={`${section}__swiper__prev home-section__swiper__prev home-section__swiper__button no-select`}
          >
            <ArrowSvg />
          </div>
          <div
            className={`${section}__swiper__next home-section__swiper__next home-section__swiper__button no-select`}
          >
            <ArrowSvg />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeSection;
