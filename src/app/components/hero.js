"use client";

import Image from "next/image";
import React, { useState } from "react";
import "../styles/hero.css";
import image from '../assets/domepeace.png';
import WaitlistModal from "./WaitlistModal";

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="hero-container">
      <div className="hero-content">
        {/* <Image src={image} alt="Dome Peace NY" /> */}
        <p className="cta-text">Discover how we increased Dome Peace NY's revenue by 102% in just one month.</p>
        <h1>Today's ecommerce experience treats all customers the same.</h1>
        <p>We use AI to tailor the online shopping experience to each customer, just like an in-store sales associate.</p>
        <button onClick={toggleModal} className="cta-button">Contact Us</button>
      </div>
      {modalOpen && <WaitlistModal toggleModal={toggleModal} />}
    </div>
  );
}
