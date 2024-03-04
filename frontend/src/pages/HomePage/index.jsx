import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import HomeSection from "../../components/HomeSection";
import Welcome from "../../components/Welcome";
import { fetchContext } from "../../contexts/FetchProvider";

function HomePage() {
  const { apiPlaces, apiCategories } = useContext(fetchContext);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Welcome />
      <HomeSection
        section="popular"
        header="Popular events"
        endpoint="events"
        bg={false}
      />
      {apiCategories &&
        apiCategories
          .slice(0, 3)
          .map((item) => (
            <HomeSection
              key={item._id}
              section={item.name}
              header={item.name}
              endpoint={`events/find/${item._id}`}
              bg={false}
            />
          ))}

      {apiCategories &&
        apiCategories
          .slice(3)
          .map((item) => (
            <HomeSection
              key={item._id}
              section={item.name}
              header={item.name}
              endpoint={`events/find/${item._id}`}
              bg={true}
            />
          ))}
    </>
  );
}

export default HomePage;
