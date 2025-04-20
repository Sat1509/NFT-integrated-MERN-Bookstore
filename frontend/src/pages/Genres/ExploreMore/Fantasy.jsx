import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import './FantasyRecommend.css';

const FantasyRecommend = () => {
  const { data: allBooks = [] } = useFetchAllBooksQuery();
  const fantasyBooks = allBooks.filter(book => book.category.toLowerCase() === 'fantasy');

  return (
    <div className="fantasy-rc-container">
      <h2 className="fantasy-rc-heading">Magical Realms Await</h2>

      {fantasyBooks.length === 0 ? (
        <p className="fantasy-rc-no-books">No fantasy books available.</p>
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
          className="fantasy-rc-swiper fantasy-swiper"
        >
          {fantasyBooks.map((book) => {
            const imageSrc = book.coverImage.startsWith('http')
              ? book.coverImage
              : new URL(`../../assets/books/${book.coverImage}`, import.meta.url).href;

            return (
              <SwiperSlide key={book._id}>
                <Link
                  to={`/books/${book._id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="fantasy-rc-book-card">
                    <img
                      src={imageSrc}
                      alt={book.title}
                      className="fantasy-rc-book-cover"
                    />
                    <div className="fantasy-rc-book-details">
                      <h3 className="fantasy-rc-book-title">{book.title}</h3>
                      <p className="fantasy-rc-book-description">{book.description}</p>
                      
                         
                        <p className="fantasy-new-price">₹{book.newPrice}</p>
                     
                      <button
                        className="fantasy-rc-add-to-cart-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to cart logic here
                        }}
                      >
                        Add to Spellbook
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

export default FantasyRecommend;
