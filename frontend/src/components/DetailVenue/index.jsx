import React, { useContext } from "react";
import { fetchContext } from "../../contexts/FetchProvider";
import "./index.scss";

function DetailVenue({ placeId }) {
  const { apiPlaces } = useContext(fetchContext);

  const place = apiPlaces.find((item) => item._id === placeId);

  return (
    <div className="detail-venue" id="detail-venue">
      <div className="container-1200 detail-venue__wrapper">
        <div className="detail-venue__header">Venue location</div>
        <div className="detail-venue__body">
          <div className="detail-venue__map">
            <iframe
              src={place?.location}
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div
            className="detail-venue__place"
            style={{ backgroundImage: `url(${place?.image})` }}
          >
            <div className="detail-venue__place__name">{place?.name}</div>
            <div className="detail-venue__place__address">{place?.address}</div>
            {place?.phone && (
              <div className="detail-venue__place__phone">
                <div className="detail-venue__place__title">Phone</div>
                <a href={`tel:&{place?.phone}`}>{place?.phone}</a>
              </div>
            )}
            {place?.mobile && (
              <div className="detail-venue__place__mobile">
                <div className="detail-venue__place__title">Mobile</div>
                <a href={`tel:&{place?.mobile}`}>{place?.mobile}</a>
              </div>
            )}
            <div className="detail-venue__place__button">
              <a href={place?.link} target="_blank">
                Get direction
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailVenue;
