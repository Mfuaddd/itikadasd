import React from "react";
import facebook from "../../assets/images/facebook.svg";
import instagram from "../../assets/images/instagram.svg";
import tiktok from "../../assets/images/tiktok.svg";
import twitter from "../../assets/images/twitter.svg";
import linkedin from "../../assets/images/linkedin.svg";
import cards from "../../assets/images/cards.svg";

import ITicketLogoSvg from "../../assets/icons/ITicketLogoSvg";
import "./index.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="container-1200 footer__wrapper">
        <div className="footer__top">
          <div className="footer__section footer__logo">
            <ITicketLogoSvg />
            <div className="footer__support">
              <div>Support service</div>
              <a className="footer__phone" href="tel:+994-12-424-24-24">
                +994 12 424 24 24
              </a>
            </div>
          </div>
          <div className="footer__section">
            <div className="footer__title">Information</div>
            <ul className="footer__list">
              <li>FAQ</li>
              <li>Support</li>
              <li>Terms & Conditions</li>
              <li>E-ticket</li>
              <li>Ticket refund or change</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer__section">
            <div className="footer__title">iTicket</div>
            <ul className="footer__list">
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>Venues</li>
              <li>Point of Sales</li>
              <li>Karabakh Revival Foundation</li>
              <li>Contacts</li>
            </ul>
          </div>
          <div className="footer__section footer__security">
            <div className="footer__title">Security</div>
            <p>
              All payments are protected by 3D Secure from Visa, Visa Electron,
              Maestro & MasterCard
            </p>
            <div className="footer__image">
              <img src={cards} alt="" />
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__copyright">
            ITICKET® is a registered trademark of «ITICKET» LLC.
          </div>
          <div className="footer__links">
            <a
              className="footer__icon"
              href="https://www.facebook.com/iTicket.az/"
              target="_blank"
            >
              <img src={facebook} alt="" />
            </a>
            <a
              className="footer__icon"
              href="https://www.instagram.com/iticket.az/"
              target="_blank"
            >
              <img src={instagram} alt="" />
            </a>
            <a
              className="footer__icon"
              href="https://www.tiktok.com/@iticketaz"
              target="_blank"
            >
              <img src={tiktok} alt="" />
            </a>
            <a
              className="footer__icon"
              href="https://twitter.com/iticketaz"
              target="_blank"
            >
              <img src={twitter} alt="" />
            </a>
            <a
              className="footer__icon"
              href="https://www.linkedin.com/company/iticket.az/"
              target="_blank"
            >
              <img src={linkedin} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
