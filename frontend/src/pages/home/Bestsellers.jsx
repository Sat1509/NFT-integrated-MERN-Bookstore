import React, { useState, useEffect } from 'react';
import './css/bestsellers.css'; // Import CSS

const NYTBestsellers = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const response = await fetch('https://nft-integrated-mern-bookstore-6mvs.vercel.app/api/nyt-bestsellers');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data); // Log the data for inspection
        setBestsellers(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching bestsellers:', error);
      }
    };
    fetchBestsellers();
  }, []);

  return (
    <div className="nyt-bestsellers-container">
      <h2 className="nyt-bestsellers-heading">NYT Bestsellers</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="bestsellers-list-container">
          <ul className="bestsellers-list">
            {bestsellers.results && bestsellers.results.books && bestsellers.results.books.map((book) => (
              <li key={book.title} className="bestseller-item">
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NYTBestsellers;
