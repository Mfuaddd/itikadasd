import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import MainProvider from "./contexts/MainProvider/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <MainProvider>
          <App />
        </MainProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
