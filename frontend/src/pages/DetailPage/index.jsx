import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import DetailAbout from "../../components/DetailAbout";
import DetailInfo from "../../components/DetailInfo";
import DetailSimilar from "../../components/DetailSimilar";
import DetailVenue from "../../components/DetailVenue";
import DetailWelcome from "../../components/DetailWelcome";
import { getFetch } from "../../helpers/FetchHelper";
import "./index.scss";

function DetailPage() {
  const [apiData, setApiData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getFetch(`http://localhost:3000/events/${id}`, setApiData);
  }, []);

  return (
    <>
      <Helmet>
        <title>{apiData?.name}</title>
      </Helmet>
      <DetailWelcome
        detail_img={apiData?.detail_img}
        price={apiData?.price}
        id={id}
      />
      <DetailInfo age={apiData?.age} />
      <DetailAbout item={apiData} />
      <DetailVenue placeId={apiData?.place_id} />
      <DetailSimilar categoryId={apiData?.category_id} itemId={apiData?._id} />
    </>
  );
}

export default DetailPage;
