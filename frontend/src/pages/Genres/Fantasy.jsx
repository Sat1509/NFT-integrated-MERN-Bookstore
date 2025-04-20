import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './css/FantasyPage.css';
import sixofcrows from "../../assets/sixofcrows.jpeg";
import poppywar from "../../assets/poppywar.jpg";
import fantasybg from "../../assets/fantasybg.jpeg";
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi'; // Adjust the import path as needed

function FantasyPage({ onExploreClick }) {
  const { data: allBooks = [] } = useFetchAllBooksQuery();

  const getBookId = (title) => {
    const book = allBooks.find(book => book.title === title);
    return book ? book._id : null;
  };

  return (
    <div className="fantasy-page" style={{backgroundImage: `url(${fantasybg})`}}>
      <div className="fantasy-page-container">
        <section className="fantasy-hero-section">
          <h1 className="fantasy-hero-title">Worlds Beyond the Veil</h1>
          <p className="fantasy-hero-subtitle">Escape into the realms of magic, mystery, and adventure.</p>
          <button className="fantasy-cta-btn" onClick={onExploreClick}>Explore Our Fantasy Collection</button>
        </section>
        <section className="fantasy-intro">
          <p>
            In these worlds of magic and wonder, characters navigate realms of danger, romance, and deep mystery. Immerse yourself in tales that evoke both dreams and reality.
          </p>
        </section>

        <section className="fantasy-featured-books">
          <Link to={`/books/${getBookId("The Poppy War")}`} className="fantasy-book-card">
            <img src={poppywar} alt="The Poppy War" className="fantasy-book-cover" />
            <h3>The Poppy War</h3>
            <p>"An epic tale of war, magic, and tragedy, set against the backdrop of ancient China." - <i>Book Review</i></p>
            <button className="fantasy-learn-more-btn">Learn More</button>
          </Link>
          
          <Link to={`/books/${getBookId("Six of Crows")}`} className="fantasy-book-card">
            <img src={sixofcrows} alt="Six of Crows" className="fantasy-book-cover" />
            <h3>Six of Crows</h3>
            <p>"A gripping tale of heists, criminals, and unlikely heroes." - <i>Book Review</i></p>
            <button className="fantasy-learn-more-btn">Learn More</button>
          </Link>
        </section>

        <section className="fantasy-related-books">
          <div className="fantasy-related-books-carousel">
          </div>
        </section>
      </div>
    </div>
  );
}

export default FantasyPage;
