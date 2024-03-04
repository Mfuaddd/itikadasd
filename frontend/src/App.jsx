import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { fetchContext } from "./contexts/FetchProvider";
import { tokenContext } from "./contexts/TokenProvider";
import MainLayout from "./layouts/MainLayout";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./routes/PrivateRoute";
import { wishlistContext } from "./contexts/WishlistProvider";
import AboutPage from "./pages/AboutPage";

function App() {
  const { apiCategories, getApiPlaces, getApiCategories } =
    useContext(fetchContext);
  const { token, decode, checkToken } = useContext(tokenContext);
  const { wishlist, getWishlist } = useContext(wishlistContext);

  useEffect(() => {
    getApiPlaces();
    getApiCategories();
    checkToken();
    getWishlist(token);
  }, [token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/events" element={<CategoryPage />} />
          <Route path="/events/:id" element={<CategoryPage />} />
          <Route path="/wishlist" element={<CategoryPage type="wishlist" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path={"/adminpanel"} element={<PrivateRoute />}>
          <Route index element={<Navigate to="/adminpanel/users" />} />
          <Route path={"/adminpanel/:page"} element={<AdminPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
