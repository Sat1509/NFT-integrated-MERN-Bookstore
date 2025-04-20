import React from "react";
import { Link } from "react-router-dom";
import fantasyImage from "../../assets/fantasy.jpg";
import romanceImage from "../../assets/romance.jpg";
import dystopianImage from "../../assets/dystopian.jpg";
import thrillerImage from "../../assets/thriller.jpg";
import "./css/GenreSection.css";

const GenreSection = () => {
  const genres = [
    { name: "Fantasy", image: fantasyImage, link: "/fantasy" },
    { name: "Romance", image: romanceImage, link: "/romance" },
    { name: "Dystopian", image: dystopianImage, link: "/dystopian" },
    { name: "Thriller", image: thrillerImage, link: "/thriller" },
  ];

  return (
    <div className="genre-section">
      <h2 className="genre-heading">Dive into Different Genres</h2>
      <div className="genre-grid">
        {genres.map((genre, index) => (
          <Link to={genre.link} key={index} className="genre-tile">
            <img src={genre.image} alt={genre.name} />
            <p>{genre.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreSection;
