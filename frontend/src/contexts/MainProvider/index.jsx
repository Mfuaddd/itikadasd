import React from "react";
import FetchProvider from "../FetchProvider";
import TokenProvider from "../TokenProvider";
import WishlistProvider from "../WishlistProvider";

function MainProvider({ children }) {
  return (
    <>
      <TokenProvider>
        <WishlistProvider>
          <FetchProvider>{children}</FetchProvider>
        </WishlistProvider>
      </TokenProvider>
    </>
  );
}

export default MainProvider;
