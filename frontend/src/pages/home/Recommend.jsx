import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import './css/Recommend.css';

const Recommend = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  return (
    <div className="rc-container">
      <h2 className="rc-heading">Recommended for You</h2>

      {books.length === 0 ? (
        <p className="rc-no-books">No books available.</p>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1180: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation]}
          className="rc-swiper"
        >
          {books.slice(8, 18).map((book) => {
            // Check if the coverImage is a URL or a path to assets
            const imageSrc = book.coverImage.startsWith('http')
              ? book.coverImage // If it's a URL, use it
              : new URL(
                  `../../assets/books/${book.coverImage}`,
                  import.meta.url
                ).href; // If it's not a URL, fallback to assets

            return (
              <SwiperSlide key={book._id}>
                {/* Wrap the book card with Link */}
                <Link
                  to={`/books/${book._id}`} // Navigate to SingleBook page
                  style={{ textDecoration: 'none', color: 'inherit' }} // Keep styles intact
                >
                  <div className="rc-book-card">
                    <img
                      src={imageSrc}
                      alt={book.title}
                      className="rc-book-cover"
                    />
                    <div className="rc-book-details">
                      <h3 className="rc-book-title">{book.title}</h3>
                      <p className="rc-book-description">{book.description}</p>
                      <p className="rc-book-price">
                        {book.oldPrice && (
                          <span className="old-price">₹{book.oldPrice}</span>
                        )}
                        <span className="new-price">₹{book.newPrice}</span>
                      </p>
                      {/* Add to Cart button */}
                      <button
                        className="rc-add-to-cart-btn"
                        
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default Recommend;
