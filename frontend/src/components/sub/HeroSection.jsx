import React from "react";
import "./css/HeroSection.css";
import atomicHabits from "../../assets/atomic.jpg";
import cruelPrince from "../../assets/cruel.jpg";

const HeroSection = () => {
  return (
    <div className="hero">
    <div className="hero-container">
    <div className="content-wrapper">
      <div className="hero-text">
        <h1>Rewrite Your Story, One Choice at a Time</h1>
        <p>
          Some changes arrive like a storm, fierce and undeniable. Others unfold in
          whispers, a quiet shift until everything is different.
        </p>
        <p>
          Power is not taken in a day, nor are habits broken in an instant. But with
          each step, each choice, you shape the story only you can tell.
        </p>
        <p className="tagline">What will your next chapter be?</p>
      </div>
      <div className="books-container">
        <div className="book glow">
          <img src={cruelPrince} alt="The Cruel Prince" />
          <p className="book-title">The Cruel Prince</p>
        </div>
        <div className="book glow">
          <img src={atomicHabits} alt="Atomic Habits" />
          <p className="book-title">Atomic Habits</p>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default HeroSection;