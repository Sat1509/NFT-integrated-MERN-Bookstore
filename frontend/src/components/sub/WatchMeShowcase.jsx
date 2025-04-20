import React from "react";
import { Link } from "react-router-dom";
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi'; // Adjust this import path as needed
import "./css/WatchMeShowcase.css";
import watch from "../../assets/watch-me-cover.jpg";

const WatchMeShowcase = () => {
  const { data: allBooks = [] } = useFetchAllBooksQuery();

  const getBookId = (title) => {
    const book = allBooks.find(book => book.title === "Watch Me");
    return book ? book._id : null;
  };

  return (
    <section className="watch-me-section">
      <div className="watch-me-text">
        <h2>Watch Me: Between Love and Ruin.</h2>
        <p>
          Dive into the captivating world of <strong>Watch Me</strong>—a tale of
          love, ambition, and resilience. Whether you're new to this enthralling
          story or a longtime fan of the <strong>Shatter Me</strong> series, this is your ultimate guide.
        </p>
        <Link to={`/books/${getBookId("Watch Me")}`} className="watch-me-btn">
          Take Me There
        </Link>
      </div>
      <div className="watch-me-image">
        <img src={watch} alt="Watch Me Book Cover" />
      </div>
    </section>
  );
};

export default WatchMeShowcase;
