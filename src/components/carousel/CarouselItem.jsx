import React, { useEffect, useState } from "react";
import { getImageSource, OPTIONS } from "../../utils/utils.js";
import { movieGenres, tvGenres } from "../../utils/genres.js";
import { FaPlay } from "react-icons/fa";
const CarouselItem = ({ item, isActive, setTrailer }) => {
  const [videos, setVideos] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    setTrailer(
      videos.results.filter((video) => video.type === "Trailer")[0].key ||
        videos.results[0]
    );
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${item.media_type}/${item.id}/videos?language=en-US`,
      OPTIONS
    )
      .then((res) => res.json())
      .then((res) => setVideos(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className={`carousel__item${isActive ? " carousel__item--active" : ""}`}
    >
      <img
        src={getImageSource(item.backdrop_path, "original")}
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
        <a href="#" className="carousel__item-trailer" onClick={handleClick}>
          Watch trailer
          <FaPlay />
        </a>
      </div>
    </div>
  );
};

export default CarouselItem;
