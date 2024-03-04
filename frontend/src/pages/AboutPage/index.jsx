import React from "react";
import "./index.scss";

function AboutPage() {
  return (
    <div className="about">
      <div className="container-1200 about__wrapper">
        <img className="about__img" src="https://iticket.az/uploads/about-title.png" alt="" />
        <img className="about__img" src="https://iticket.az/uploads/3d-map.jpg" alt="" />
        <div className="about__info">
          <span className="about__info--bold">iTicket.az</span> - launched in 2016 to provide online ticket
          sales service for the wide range of events - concerts, theatres,
          festivals, sports and popular attractions. More than 20 ticket sales
          outlets in Baku are operated by iTicket.az. Since 2017, iTicket.az is
          the official ticket provider and supporter of IV Islamic Solidarity
          Games, Azerbaijan Grand Prix Formula 1 2017 and 2018, European Women'
          Volleyball Championships 2017, UEFA Champions League Group Stage, BMX
          World Cycling Championship in Baku, JARA'18 Music Festival, Azerbaijan
          Judo Federation and AFFA as well. iTicket.az strives to make a
          convenient ticket purchasing process by constantly enhancing its
          technologies and services.
        </div>
        <div className="about__info">
          <div>Company name</div>
          <div>«İTİCKET» LLC</div>
          <div>ITN</div>
          <div>1701956271</div>
          <div>SRN (State registration number)</div>
          <div>1601020018130100</div>
          <div>Address</div>
          <div>
            Azerbaijan, Baku, Samad Vurgun 34, AF Mall 14th floor, office 36
            AZ1014
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
