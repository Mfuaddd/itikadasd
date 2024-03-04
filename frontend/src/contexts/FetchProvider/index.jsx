import React, { createContext, useState } from "react";
import { getFetch } from "../../helpers/FetchHelper";

export const fetchContext = createContext();

function FetchProvider({ children }) {
  const [apiPlaces, setApiPlaces] = useState([]);
  const [apiCategories, setApiCategories] = useState([]);

  const getApiPlaces = async () =>
    await getFetch("http://localhost:3000/places/", setApiPlaces);
  const getApiCategories = async () =>
    await getFetch("http://localhost:3000/categories/", setApiCategories);
  const data = {
    getApiPlaces,
    apiPlaces,
    getApiCategories,
    apiCategories,
  };

  return <fetchContext.Provider value={data}>{children}</fetchContext.Provider>;
}

export default FetchProvider;
