import React from "react";
import { getImageSource } from "../../utils/utils";
import { FaStar } from "react-icons/fa";
import { movieGenres, tvGenres } from "../../utils/genres";

const Card = ({ data }) => {
  const getTitle = (obj) => {
    if (obj.media_type === "movie") {
      return obj.title;
    }

    return obj.name;
  };

  const getYear = (obj) => {
    if (obj.media_type === "movie") {
      return new Date(obj.release_date).getFullYear() || "Unknown year";
    }

    return new Date(obj.first_air_date).getFullYear() || "Unknown year";
  };

  return (
    <div className="card">
      <div className="card__img-block">
        <img
          className="card__img"
          src={getImageSource(data.poster_path, "w500")}
          alt={getTitle(data)}
          loading="lazy"
        />
      </div>
      <div className="card__body">
        <h3 className="card__title">{getTitle(data)}</h3>
        <div className="card__group">
          <span className="card__year">{getYear(data)}</span>
          <span className="card__rating">
            <FaStar />
            {data.vote_average.toFixed(1)}
          </span>
        </div>
        <div className="card_genres">
          {data.genre_ids.map((id) => (
            <span key={id} className="card__genre">
              {data.media_type === "movie"
                ? movieGenres.find((genre) => genre.id === id)?.name ||
                  "Unknown Genre"
                : tvGenres.find((genre) => genre.id === id)?.name ||
                  "Unknown Genre"}
            </span>
          ))}
        </div>
        <p className="card__overview">{data.overview}</p>
      </div>
    </div>
  );
};

export default Card;
