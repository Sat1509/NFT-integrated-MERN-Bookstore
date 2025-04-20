import React from "react";
import "./css/LoveLetterSection.css";
import book1 from "../../assets/Evelyn.jpg";
import book2 from "../../assets/atomic.jpg";
import loveLetterBg from "../../assets/LoveLetter.jpeg";

const LoveLetterSection = () => {
  return (
    <section className="love-letter-section" style={{ backgroundImage: `url(${loveLetterBg})` }}>
      <div className="overlay-text">"My love, in these pages, we live forever..."</div>
      <div className="books-container">
        <img src={book1} alt="The Seven Husbands of Evelyn Hugo" className="book book-left" />
        <img src={book2} alt="Atomic Habits" className="book book-right" />
      </div>
      <div className="letter-details">
        <p className="handwritten">"You once told me that words live longer than people... so here we are, forever bound in ink."</p>
      </div>
    </section>
  );
};

export default LoveLetterSection;
