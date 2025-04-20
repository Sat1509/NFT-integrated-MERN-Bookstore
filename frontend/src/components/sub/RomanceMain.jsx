import React from "react";
import './css/RomancePage.css';
import songofachilles from "../../assets/achilles.jpg";
import wutheringheights from "../../assets/wuthering.jpg";
import forest from "../../assets/pathtoforest.jpg"
import { Link } from "react-router-dom";
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi'; // Adjust the import path as needed

function RomanceMain() {
  const { data: allBooks = [] } = useFetchAllBooksQuery();

  const getBookId = (title) => {
    const book = allBooks.find(book => book.title === title);
    return book ? book._id : null;
  };

  return (
    <div className="romance-page">
      <header className="romance-header">
        <div className="romance-text">
          <h1 className="romance-title">Between The Pages, We Find Forever</h1>
          <p className="romance-subtitle">
            "In pages worn and ink-stained dreams,  
            where love ignites in whispered themes.  
            A touch, a glance, a longing sigh—  
            where hearts collide and never die."
          </p>
        </div>
        <div className="image-frame">
          <img src={forest} alt="Romantic Forest Scene" className="framed-image" />
        </div>
      </header>

      <main className="romance-main">
        <section className="romance-featured">
          <h2 className="romance-section-title">Featured Romances</h2>
          <div className="romance-book-list">
            <Link to={`/books/${getBookId("The Song of Achilles")}`} className="romance-book-card">
              <div className="romance-book-cover-container">
                <img src={songofachilles} alt="The Song of Achilles" className="romance-book-cover" />
              </div>
              <div className="romance-book-info">
                <h3 className="romance-book-title">The Song of Achilles</h3>
                <p className="romance-book-description">A heart-wrenching tale of love and loss in the world of Greek mythology, where gods and mortals intertwine in a passionate, yet tragic romance.</p>
                <button className="romance-read-more">Read More</button>
              </div>
            </Link>

            <Link to={`/books/${getBookId("Wuthering Heights")}`} className="romance-book-card">
              <div className="romance-book-cover-container">
                <img src={wutheringheights} alt="Wuthering Heights" className="romance-book-cover" />
              </div>
              <div className="romance-book-info">
                <h3 className="romance-book-title">Wuthering Heights</h3>
                <p className="romance-book-description">A tempestuous and haunting tale of forbidden love on the moors, where passion is both destructive and eternal.</p>
                <button className="romance-read-more">Read More</button>
              </div>
            </Link>
          </div>
        </section>

        <section className="romance-quote">
          <blockquote className="romance-blockquote">
            "Love is composed of a single soul inhabiting two bodies."
          </blockquote>
          <cite className="romance-cite">- Aristotle</cite>
        </section>
      </main>

      
    </div>
  );
}

export default RomanceMain;
