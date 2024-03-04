import React from "react";
import "./index.scss";
import ITicketLogoSvg from "../../assets/icons/ITicketLogoSvg";
import AdminPlaces from "../../components/AdminPlaces";
import { useNavigate, useParams } from "react-router-dom";
import AdminCategories from "../../components/AdminCategories";
import AdminEvents from "../../components/AdminEvents";
import AdminUsers from "../../components/AdminUsers";

function AdminPage() {
  const { page } = useParams();
  const navigate = useNavigate();

  const handleSelect = (e) => {
    navigate(`/adminpanel/${e.target.innerText}`.toLocaleLowerCase());
  };

  const checkActive = (value) => {
    return value === page.toLocaleLowerCase() ? "admin-panel__nav-active" : "";
  };

  const renderSwitch = () => {
    switch (page) {
      case "users":
        return <AdminUsers />;
      case "places":
        return <AdminPlaces />;
      case "categories":
        return <AdminCategories />;
      case "events":
        return <AdminEvents />;
      default:
        return <AdminUsers />;
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__aside">
        <div className="admin-panel__logo" onClick={() => navigate("/")}>
          <ITicketLogoSvg />
        </div>
        <ul className="admin-panel__nav">
          <li onClick={handleSelect} className={`${checkActive("users")}`}>
            Users
          </li>
          <li onClick={handleSelect} className={`${checkActive("places")}`}>
            Places
          </li>
          <li onClick={handleSelect} className={`${checkActive("categories")}`}>
            Categories
          </li>
          <li onClick={handleSelect} className={`${checkActive("events")}`}>
            Events
          </li>
          <li></li>
        </ul>
      </div>
      <div className="admin-panel__body">{renderSwitch()}</div>
    </div>
  );
}

export default AdminPage;
