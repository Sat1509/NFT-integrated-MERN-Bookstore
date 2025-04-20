import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import './DystopianRecommend.css';

const DystopianRecommend = () => {
  const { data: allBooks = [] } = useFetchAllBooksQuery();
  const dystopianBooks = allBooks.filter(book => book.category.toLowerCase() === 'dystopian');

  return (
    <div className="dystopian-rc-container">
      <h2 className="dystopian-rc-heading">Explore Dystopian Futures</h2>

      {dystopianBooks.length === 0 ? (
        <p className="dystopian-rc-no-books">No dystopian books available.</p>
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
          className="dystopian-rc-swiper dystopian-swiper"
        >
          {dystopianBooks.map((book) => {
            const imageSrc = book.coverImage.startsWith('http')
              ? book.coverImage
              : new URL(`../../assets/books/${book.coverImage}`, import.meta.url).href;

            return (
              <SwiperSlide key={book._id}>
                <Link
                  to={`/books/${book._id}`}
                  className="dystopian-rc-book-link"
                >
                  <div className="dystopian-rc-book-card">
                    <div className="dystopian-rc-book-cover-container">
                      <img
                        src={imageSrc}
                        alt={book.title}
                        className="dystopian-rc-book-cover"
                      />
                    </div>
                    <div className="dystopian-rc-book-info">
                      <h3 className="dystopian-rc-book-title">{book.title}</h3>
                      <p className="dystopian-rc-book-description">{book.description}</p>
                      <p className="dystopian-rc-book-price">₹{book.newPrice}</p>
                      <button className="dystopian-rc-read-more">Explore</button>
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

export default DystopianRecommend;
