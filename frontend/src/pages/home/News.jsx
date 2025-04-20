import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

import news1 from "../../assets/news/news-1.png";
import news2 from "../../assets/news/news-2.png";
import news3 from "../../assets/news/news-3.png";
import news4 from "../../assets/news/news-4.png";
import { Link } from 'react-router-dom';

const news = [
  {
    "id": 1,
    "title": "Global Climate Summit Calls for Urgent Action",
    "description": "World leaders gather at the Global Climate Summit to discuss urgent strategies to combat climate change, focusing on reducing carbon emissions and fostering renewable energy solutions.",
    "image": news1
  },
  {
    "id": 2,
    "title": "Breakthrough in AI Technology Announced",
    "description": "A major breakthrough in artificial intelligence has been announced by researchers, with new advancements promising to revolutionize industries from healthcare to finance.",
    "image": news2
  },
  {
    "id": 3,
    "title": "New Space Mission Aims to Explore Distant Galaxies",
    "description": "NASA has unveiled plans for a new space mission that will aim to explore distant galaxies, with hopes of uncovering insights into the origins of the universe.",
    "image": news3
  },
  {
    "id": 4,
    "title": "Stock Markets Reach Record Highs Amid Economic Recovery",
    "description": "Global stock markets have reached record highs as signs of economic recovery continue to emerge following the challenges posed by the global pandemic.",
    "image": news4
  },
  {
    "id": 5,
    "title": "Innovative New Smartphone Released by Leading Tech Company",
    "description": "A leading tech company has released its latest smartphone model, featuring cutting-edge technology, improved battery life, and a sleek new design.",
    "image": news2
  }
];

const News = () => {
  return (
    <div className="news-container">
      <h2 className="news-title">News</h2>

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
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="news-item">
              {/* Content */}
              <div className="news-content">
                <Link to="/">
                  <h3 className="news-item-title">{item.title}</h3>
                </Link>
                <div className="title-line"></div> {/* Updated color */}
                <p className="news-description">{item.description}</p>
              </div>

              <div className="news-image">
                <img
                  src={item.image}
                  alt={item.title}
                  className="news-image-img"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default News;
