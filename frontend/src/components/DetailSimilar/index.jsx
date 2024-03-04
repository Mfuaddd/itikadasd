import React, { useEffect, useState } from "react";
import { getFetch } from "../../helpers/FetchHelper";
import Card from "../Card";
import "./index.scss";

function DetailSimilar({ categoryId, itemId }) {
  const [Events, setEvents] = useState([]);
  useEffect(() => {
    if (categoryId !== undefined) {
      getFetch(`http://localhost:3000/events/find/${categoryId}`, eventsFilter);
    }
  }, [categoryId]);

  const eventsFilter = (events) => {
    setEvents(events.filter((item) => item._id !== itemId).slice(0, 3));
  };

  if (Events.length > 0) {
    return (
      <div className="detail-similar">
        <div className="container-1200 detail-similar__wrapper">
          <div className="detail-similar__header">Similar Events</div>
          <div className="detail-similar__body">
            {Events.map((item) => (
              <Card item={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default DetailSimilar;
