import { Link } from "react-router-dom";
import React from 'react';
import "./css/DystopianPage.css"; // Make sure to create this CSS file
import love from "../../assets/revolution.jpeg"
const DystopianHeader = () => {
  return (
    <section className="dystopian-section">
      <div className="image-container">
        <img src={love} alt="Revolution Graffiti" />
      </div>
      <div className="dystopian-text">
        <h2>Revolution Begins Here.</h2>
        <p>
          Love and rebellion have always walked hand in hand.  
          In a world that tried to erase both, they became the same thing.  
          This isn’t just a story. It’s a revolution waiting to be read.
          
        </p>
        <a href="#" className="dystopian-btn">
          Ignite the Pages
        </a>
      </div>
    </section>
  );
};

export default DystopianHeader;

/*
const DystopianHeader = () => {
  return (
    <div className="dystopian-container">
      <div className="hero-section">
        <h1 className="glitch-text">Welcome to the Ruins</h1>
        <p className="quote">“The world tries to break us, but we are unbreakable.”</p>
      </div>
      <div className="book-section">
        <div className="book-card">
          <h2>Shatter Me</h2>
          <p>A gripping dystopian tale of power, survival, and love.</p>
        </div>
        <div className="book-card">
          <h2>Legend</h2>
          <p>A thrilling rebellion against an oppressive regime.</p>
        </div>
      </div>
      
      
      
    </div>
  );
};

export default DystopianHeader;*/

