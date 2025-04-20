import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import './RomanceRecommend.css';

const RomanceRecommend = () => {
  const { data: allBooks = [] } = useFetchAllBooksQuery();
  const romanceBooks = allBooks.filter(book => book.category.toLowerCase() === 'romance');

  return (
    <div className="romance-rc-container">
      <h2 className="romance-rc-heading">Love Stories Await</h2>

      {romanceBooks.length === 0 ? (
        <p className="romance-rc-no-books">No romance books available.</p>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation]}
          className="romance-rc-swiper romance-swiper"
        >
          {romanceBooks.map((book) => {
            const imageSrc = book.coverImage.startsWith('http')
              ? book.coverImage
              : new URL(`../../assets/books/${book.coverImage}`, import.meta.url).href;

            return (
              <SwiperSlide key={book._id}>
                <Link
                  to={`/books/${book._id}`}
                  className="romance-rc-book-link"
                >
                  <div className="romance-rc-book-card">
                    <div className="romance-rc-book-cover-container">
                      <img
                        src={imageSrc}
                        alt={book.title}
                        className="romance-rc-book-cover"
                      />
                    </div>
                    <div className="romance-rc-book-info">
                      <h3 className="romance-rc-book-title">{book.title}</h3>
                      <p className="romance-description">{book.description}</p>
                      <p className="romance-rc-book-price">₹{book.newPrice}</p>
                      <button className="romance-rc-read-more">Read More</button>
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

export default RomanceRecommend;
