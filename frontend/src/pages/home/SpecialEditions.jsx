import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useGetSpecialEditionsQuery } from '../../redux/features/nfts/SpecialEditionApi';

import './css/SpecialEditions.css';

const SpecialEditions = () => {
  const { data: specialEditions = [] } = useGetSpecialEditionsQuery();

  return (
    <div className="se-container">
      <h2 className="se-heading">Exclusive Special Editions</h2>

      {specialEditions.length === 0 ? (
        <p className="se-no-books">No special editions available.</p>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 2, spaceBetween: 50 },
            1180: { slidesPerView: 3, spaceBetween: 50 },
          }}
          modules={[Navigation]}
          className="se-swiper"
        >
          {specialEditions.map((book) => {
            const imageSrc = book.coverImage.startsWith('http')
              ? book.coverImage
              : new URL(`../../assets/books/${book.coverImage}`, import.meta.url).href;

            return (
              <SwiperSlide key={book._id}>
                <Link to={`/special-editions/${book._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="se-book-card">
                    <span className="se-badge">RARE</span>
                    <div className="se-book-cover-wrapper">
                      <img src={imageSrc} alt={book.title} className="se-book-cover" />
                    </div>
                    <div className="se-book-details">
                      <h3 className="se-book-title">{book.title}</h3>
                      <p className="se-book-description">{book.description}</p>
                      <p className="se-book-price">₹{book.price}</p>
                      <button
                        className="se-add-to-cart-btn"
                        onClick={() => console.log('Purchase Special Edition')}
                      >
                        Purchase
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

export default SpecialEditions;
