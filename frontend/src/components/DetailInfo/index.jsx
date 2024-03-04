import React from "react";
import "./index.scss";
import dataSvg from "../../assets/images/date.svg";
import venueSvg from "../../assets/images/venue.svg";
import ageSvg from "../../assets/images/age.svg";
import localeSvg from "../../assets/images/locale.svg";
import currencySvg from "../../assets/images/currency.svg";
import ticketsSvg from "../../assets/images/tickets.svg";
import infoSvg from "../../assets/images/info.svg";

function DetailInfo({ age }) {
  return (
    <div className="detail-info">
      <div className="container-1200 detail-info__wrapper">
        <a href="#detail-venue" className="detail-info__card">
          <div className="detail-info__card__icons">
            <div className="detail-info__card__icons-first">
              <img src={venueSvg} alt="" />
            </div>
            <div className="detail-info__card__icons-last">
              <img src={dataSvg} alt="" />
            </div>
          </div>
          <div className="detail-info__card__texts">
            <div>Venue</div>
            <div>Date</div>
          </div>
        </a>
        <a href="#detail-about" className="detail-info__card">
          <div className="detail-info__card__icons">
            <div className="detail-info__card__icons-first">
              <img src={ageSvg} alt="" />
              <span>{age}+</span>
            </div>
            <div className="detail-info__card__icons-last">
              <img src={localeSvg} alt="" />
            </div>
          </div>
          <div className="detail-info__card__texts">
            <div>Language</div>
            <div>Age restrictions</div>
          </div>
        </a>
        <a href="#detail-venue" className="detail-info__card">
          <div className="detail-info__card__icons">
            <div className="detail-info__card__icons-first">
              <img src={currencySvg} alt="" />
            </div>
            <div className="detail-info__card__icons-last">
              <img src={ticketsSvg} alt="" />
            </div>
          </div>
          <div className="detail-info__card__texts">
            <div>Price</div>
            <div>Ticket info</div>
          </div>
        </a>
        <a href="#detail-about" className="detail-info__card">
          <div className="detail-info__card__icons">
            <div className="detail-info__card__icons-first">
              <img src={infoSvg} alt="" />
            </div>
          </div>
          <div className="detail-info__card__texts">
            <div>About event</div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default DetailInfo;
