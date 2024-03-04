import React, { useContext, useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import "./index.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import ITicketLogoSvg from "../../assets/icons/ITicketLogoSvg";
import NavigationDotsSvg from "../../assets/icons/NavigationDotsSvg";
import HeartSvg from "../../assets/icons/HeartSvg";
import ProfileSvg from "../../assets/icons/ProfileSvg";
import CartSvg from "../../assets/icons/CartSvg";
import MagnifyingGlassSvg from "../../assets/icons/MagnifyingGlassSvg";
import AuthModal from "../../components/AuthModal";
import logoutSvg from "../../assets/images/Logout.svg";
import { tokenContext } from "../../contexts/TokenProvider";
import BarsSvg from "../../assets/icons/BarsSvg";

function Header() {
  const [isHome, setIsHome] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNavDotsOpen, setIsNavDotsOpen] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [apiData, setApiData] = useState([]);
  const { token, decode, logout } = useContext(tokenContext);
  const location = useLocation();
  const size = useWindowSize();

  const getApiData = async () => {
    const res = await fetch(`http://localhost:3000/categories`);
    const data = await res.json();
    const sortedData = data.sort((a, b) => a.index - b.index);
    setApiData(sortedData);
  };

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    let isHome =
      location.pathname.startsWith("/detail") || location.pathname === "/";
    if (size.width < 1256) {
      isHome = false;
      setIsAsideOpen(false);
      setIsNavDotsOpen(false);
    } else {
      setIsAsideOpen(true);
    }
    setIsHome(isHome);
  }, [location, size]);

  const headerLogout = (e) => {
    e.stopPropagation();
    logout();
    setIsProfileOpen(false);
  };

  const profileToggle = (e) => {
    e?.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
  };

  const navDotsToggle = (e) => {
    e?.stopPropagation();
    setIsNavDotsOpen(!isNavDotsOpen);
  };

  const AsideToggle = (e) => {
    e?.stopPropagation();
    setIsAsideOpen(!isAsideOpen);
  };

  const StopPropagation = (e) => {
    e?.stopPropagation();
  };

  const isAllEventsActive = () => {
    return location.pathname === "/events" ? "active" : "";
  };

  return (
    <>
      <div className={`header${isHome ? " header-home" : ""}`}>
        <div className="container-1400 header__wrapper">
          <div className="header__icons header__bars" onClick={AsideToggle}>
            <BarsSvg />
          </div>
          <div className="header__logo">
            <Link to="/">
              <ITicketLogoSvg />
            </Link>
          </div>
          {isAsideOpen ? (
            <div className="header__aside" onClick={AsideToggle}>
              <div className="header__aside__content" onClick={StopPropagation}>
                <div className="header__aside__head">
                  <div className="header__logo" onClick={AsideToggle}>
                    <Link to="/">
                      <ITicketLogoSvg />
                    </Link>
                  </div>
                  <div className="header__aside__close" onClick={AsideToggle}>
                    &times;
                  </div>
                </div>
                <ul className="header__nav">
                  <li className="header__nav__item">
                    <Link to="/events" className={`${isAllEventsActive()}`}>
                      All events
                    </Link>
                  </li>
                  {apiData &&
                    apiData.slice(0, 5).map((item) => (
                      <li
                        key={item._id}
                        className="header__nav__item"
                        onClick={AsideToggle}
                      >
                        <NavLink to={`/events/${item._id}`}>
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  <li
                    className="header__icons header__icons__dots"
                    onClick={navDotsToggle}
                  >
                    <NavigationDotsSvg />
                    {isNavDotsOpen ? (
                      <ul className="header__icons__popup header__popup no-select">
                        {apiData &&
                          apiData.slice(5).map((item) => (
                            <li
                              key={item._id}
                              onClick={(e) => {
                                navDotsToggle(e);
                                AsideToggle(e);
                              }}
                            >
                              <NavLink to={`/events/${item._id}`}>
                                {item.name}
                              </NavLink>
                            </li>
                          ))}
                      </ul>
                    ) : null}
                  </li>
                </ul>
              </div>
            </div>
          ) : null}

          <div className="header__control">
            {token && (
              <div className="header__heart header__icons">
                <Link to="/wishlist">
                  <HeartSvg />
                </Link>
              </div>
            )}
            {/* <div className="header__search header__icons">
              <MagnifyingGlassSvg />
            </div>
            <div className="header__cart header__icons">
              <CartSvg />
            </div> */}
            <div
              className="header__profile header__icons"
              onClick={profileToggle}
            >
              <ProfileSvg />

              {isProfileOpen ? (
                token ? (
                  <ul className="header__profile__popup no-select">
                    {decode.role == "admin" ? (
                      <li>
                        <Link to="/adminpanel" className="no-select">
                          Admin Panel
                        </Link>
                      </li>
                    ) : null}
                    <li onClick={headerLogout}>
                      <div className="no-select">Logout</div>
                      <div>
                        <img src={logoutSvg} alt="" />
                      </div>
                    </li>
                  </ul>
                ) : (
                  <AuthModal toggleOpen={profileToggle} />
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
