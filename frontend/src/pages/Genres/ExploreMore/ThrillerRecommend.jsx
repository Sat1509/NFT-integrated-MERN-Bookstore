import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import './ThrillerRecommend.css';

const ThrillerRecommend = () => {
  const { data: allBooks = [] } = useFetchAllBooksQuery();
  const thrillerBooks = allBooks.filter(book => book.category.toLowerCase() === 'thriller');

  return (
    <div className="thriller-rc-container">
      <h2 className="thriller-rc-heading">Dive into Thrilling Adventures</h2>

      {thrillerBooks.length === 0 ? (
        <p className="thriller-rc-no-books">No thriller books available.</p>
      ) : (
        <Swiper
  slidesPerView={1}
  spaceBetween={20} /* Reduced space between slides */
  navigation={true}
  breakpoints={{
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  }}
  modules={[Navigation]}
  className="thriller-rc-swiper thriller-swiper"
>
          {thrillerBooks.map((book) => {
            const imageSrc = book.coverImage.startsWith('http')
              ? book.coverImage
              : new URL(`../../assets/books/${book.coverImage}`, import.meta.url).href;

            return (
              <SwiperSlide key={book._id}>
                <Link
                  to={`/books/${book._id}`}
                  className="thriller-rc-book-link"
                >
                  <div className="thriller-rc-book-card">
                    <div className="thriller-rc-book-cover-container">
                      <img
                        src={imageSrc}
                        alt={book.title}
                        className="thriller-rc-book-cover"
                      />
                    </div>
                    <div className="thriller-rc-book-info">
                      <h3 className="thriller-rc-book-title">{book.title}</h3>
                      <p className="thriller-description">{book.description}</p>
                      <p className="thriller-rc-book-price">₹{book.newPrice}</p>
                      <button className="thriller-rc-read-more">Read More</button>
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

export default ThrillerRecommend;
