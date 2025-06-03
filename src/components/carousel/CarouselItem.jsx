import React from "react";
import { BASE_URL, FILE_SIZE } from "../../utils/utils.js";
import { movieGenres, tvGenres } from "../../utils/genres.js";
const CarouselItem = ({ item, isActive }) => {
  return (
    <div
      className={`carousel__item${isActive ? " carousel__item--active" : ""}`}
    >
      <img
        src={BASE_URL + FILE_SIZE.ORIGINAL + item.backdrop_path}
        alt=""
        className="carousel__item-img"
        loading="lazy"
      />
      <div className="carousel__item-info">
        <h3 className="carousel__item-title">{item.title || item.name}</h3>
        <div className="carousel__item-details">
          <span>
            {new Date(item.release_date || item.first_air_date).getFullYear()}
          </span>
          <span>{item.vote_average.toFixed(1)}</span>
        </div>
        <div className="carousel__item-genres">
          {item.genre_ids.map((id) => (
            <span key={id}>
              {item.media_type === "movie"
                ? movieGenres.find((genre) => genre.id === id)?.name ||
                  "Unknown Genre"
                : tvGenres.find((genre) => genre.id === id)?.name ||
                  "Unknown Genre"}
            </span>
          ))}
        </div>
        <p className="carousel__item-overview">{item.overview}</p>
        <div className="carousel__item-trailer">
          <a href="#" className="btn">
            Watch trailer
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
