import React, { useState } from "react";
import "./index.scss";

function DetailAbout({ item }) {
  const [activeTab, setActiveTab] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  return (
    <div className="detail-about" id="detail-about">
      <div className="container-1200 detail-about__wrapper">
        <div className="detail-about__info">
          <div className="detail-about__tabs">
            <div
              className={`detail-about__tab${activeTab ? " tab-active" : ""}`}
              onClick={() => setActiveTab(true)}
            >
              About event
            </div>
            <div
              className={`detail-about__tab${activeTab ? "" : " tab-active"}`}
              onClick={() => setActiveTab(false)}
            >
              Age restrictions / Language
            </div>
          </div>
          <div className="detail-about__body">
            {activeTab ? (
              <div className="detail-about__content">{item.about}</div>
            ) : (
              <div className="detail-about__content">
                {item.age}+ / {item.language}
              </div>
            )}
          </div>
          <div className="detail-about__gallery">
            <div
              className="image-modal"
              style={!!activeImage ? { display: "flex" } : null}
            >
              <span
                className="image-modal__close"
                onClick={() => setActiveImage(null)}
              >
                &times;
              </span>
              <img className="image-modal__content" src={activeImage}></img>
            </div>
            <div className="detail-about__image">
              <img
                src={item.slide_img}
                onClick={() => setActiveImage(item.slide_img)}
              />
            </div>
            <div className="detail-about__image">
              <img
                src={item.detail_img}
                onClick={() => setActiveImage(item.detail_img)}
              />
            </div>
          </div>
        </div>
        <div className="detail-about__big-image">
          <img
            className="detail-about__big-image--bg"
            src={item.img_bg}
            alt=""
          />
          <img
            className="detail-about__big-image--fr"
            src={item.img_fr}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default DetailAbout;
