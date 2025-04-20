

import React from "react";
import { Link } from "react-router-dom";
import "./css/Thriller.css";
import gonegirl from "../../assets/gonegirl.jpg";
import goodgirl from "../../assets/goodgirl's.jpg";
import thriller from "../../assets/thrillertitle.jpeg";
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const Thriller = ({ onUnravelClick }) => {
  const { data: allBooks = [] } = useFetchAllBooksQuery();

  const getBookId = (title) => {
    const book = allBooks.find(book => book.title === title);
    return book ? book._id : null;
  };

  return (
    <div className="thriller-page">
      <header className="thriller-header">
        <div className="thriller-header-content">
          <div className="thriller-text-content">
            <h1 className="thriller-title">Shadows Whisper, Secrets Scream</h1>
            <p className="thriller-subtitle">
              Footsteps echo in empty halls,<br />
              A breath too close, a name that calls.<br />
              Truth is a knife, sharp and thin—<br />
              Will you chase, or be chased within?
            </p>
            <button className="thriller-unravel-button" onClick={onUnravelClick}>Unravel Now</button>
          </div>
          <img src={thriller} alt="Thriller Image" className="thriller-header-image" />
        </div>
      </header>

 

      {/* Book Showcase Section */}
      <section className="thriller-books">
        <Link to={`/books/${getBookId("Gone Girl")}`} className="thriller-book-card">
          <img src={gonegirl} alt="Gone Girl Cover" className="thriller-book-cover" />
          <div className="thriller-book-info">
            <h2 className="thriller-book-title">Gone Girl</h2>
            <p className="thriller-book-description">
              A marriage full of secrets unravels when Amy Dunne disappears. A twisted psychological thriller that keeps you questioning reality.
            </p>
            <button className="thriller-read-more">Read More</button>
          </div>
        </Link>

        <Link to={`/books/${getBookId("A Good Girl's Guide to Murder")}`} className="thriller-book-card">
          <img src={goodgirl} alt="A Good Girl's Guide to Murder Cover" className="thriller-book-cover" />
          <div className="thriller-book-info">
            <h2 className="thriller-book-title">A Good Girl's Guide to Murder</h2>
            <p className="thriller-book-description">
              A high school student reopens a closed murder case for her project, uncovering dark truths that no one wanted exposed.
            </p>
            <button className="thriller-read-more">Read More</button>
          </div>
        </Link>
      </section>

      {/* Quote Section */}
      <section className="thriller-quote">
        <blockquote>
          "The truth is rarely pure and never simple."  
          <span>- Oscar Wilde</span>
        </blockquote>
      </section>

      {/* Back to Home Button */}
      <div className="thriller-back-home">
        
      </div>
    </div>
  );
};

export default Thriller;
