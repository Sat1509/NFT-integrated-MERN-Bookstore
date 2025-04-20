import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import './css/TopSellers.css';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const { data: allBooks = [], isLoading, isError } = useFetchAllBooksQuery();

  // Filter books to only include those with images in assets
  const books = allBooks.filter(book => !book.coverImage.startsWith('http'));

  const filteredBooks = selectedCategory === "Choose a genre"
    ? books
    : books.filter(book => book.category.toLowerCase() === selectedCategory.toLowerCase());

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading books.</p>;

  return (
    <div className='ts-container'>
      <h2 className='ts-heading'>Top Sellers</h2>

      <select 
        onChange={(e) => setSelectedCategory(e.target.value)} 
        name='category' 
        id='category'
        className='ts-select'
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>

      {filteredBooks.length === 0 ? (
        <p className='ts-no-books'>No books found for the selected category.</p>
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
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation]}
          className="ts-swiper"
        >
          {filteredBooks.map((book) => {
            const imageSrc = new URL(`../../assets/books/${book.coverImage}`, import.meta.url).href;
            
            return (
              <SwiperSlide key={book._id}>
                <Link
                  to={`/books/${book._id}`}
                  className="ts-book-link"
                >
                  <div className="ts-book-card">
                    <img src={imageSrc} alt={book.title} className="ts-book-cover" />
                    <div className="ts-book-details">
                      <h3 className="ts-book-title">{book.title}</h3>
                      <p className="ts-book-description">{book.description}</p>
                      <p className="ts-book-price">
                        {book.oldPrice && (
                          <span className="ts-old-price">₹{book.oldPrice}</span>
                        )}
                        <span className="ts-new-price">₹{book.newPrice}</span>
                      </p>
                      <button 
                        className="ts-add-to-cart-btn"
                       
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

export default TopSellers;
