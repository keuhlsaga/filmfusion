import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  apiFetch,
  getImageSource,
  getRunTime,
  OPTIONS,
} from "../../utils/utils.js";
import { movieGenres, tvGenres } from "../../utils/genres.js";
import { CODES } from "../../utils/translations.js";
import { FaPlay } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
const CarouselItem = ({ item, isActive, setTrailer }) => {
  const [videos, setVideos] = useState(null);
  const [runtime, setRuntime] = useState(null);
  const [ratingCategory, setRatingCategory] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    setTrailer({
      title: item.title || item.name,
      video:
        videos.results.filter((video) => video.type === "Trailer")[0].key ||
        videos.results[0],
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const promises = [
          apiFetch(
            `https://api.themoviedb.org/3/${item.media_type}/${item.id}/videos?language=en-US`,
            OPTIONS
          ),
          apiFetch(
            `https://api.themoviedb.org/3/${item.media_type}/${item.id}?language=en-US`,
            OPTIONS
          ),
          apiFetch(
            `https://api.themoviedb.org/3/${item.media_type}/${item.id}/${
              item.media_type === "movie" ? "release_dates" : "content_ratings"
            }`,
            OPTIONS
          ),
        ];
        const [trailers, runtime, releaseDatesRes] = await Promise.all(
          promises
        );

        setVideos(trailers);
        setRuntime(runtime.runtime);

        if (releaseDatesRes.results.length > 0) {
          const originalLanguage =
            item.original_language === "en"
              ? "US"
              : CODES.find((code) =>
                  code.includes(item.original_language)
                ).split("-")[1];
          const releaseDates = releaseDatesRes.results.find(
            (result) => result.iso_3166_1 === originalLanguage
          );
          let certification;

          if (releaseDates.release_dates) {
            certification =
              releaseDates.release_dates[releaseDates.release_dates.length - 1]
                .certification;
          } else {
            certification = releaseDates.rating;
          }

          setRatingCategory(certification);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div
      className={`carousel__item${isActive ? " carousel__item--active" : ""}`}
    >
      <img
        src={getImageSource(item.backdrop_path, "original")}
        alt={item.title || item.name}
        className="carousel__item-img"
        loading="lazy"
      />
      <div className="carousel__item-info">
        <h3 className="carousel__item-title">{item.title || item.name}</h3>
        <div className="carousel__item-details">
          {ratingCategory && (
            <>
              <span className="carousel__item-rating-category">
                {ratingCategory}
              </span>
              •
            </>
          )}
          <span>
            {item.media_type
              .slice(0, 1)
              .toUpperCase()
              .concat(item.media_type.slice(1))}
          </span>
          •
          <span>
            {new Date(item.release_date || item.first_air_date).getFullYear()}
          </span>
          {runtime && (
            <>
              •<span>{getRunTime(runtime)}</span>
            </>
          )}
          {/* <span className="carousel__item-rating">
            <FaStar />
            {item.vote_average.toFixed(1)} / 10
          </span>} */}
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
        <div className="carousel__item-actions">
          <button
            className="btn btn--trailer"
            type="button"
            onClick={handleClick}
          >
            Watch trailer
            <FaPlay />
          </button>
          <Link
            to={`/${item.media_type}/${item.id}`}
            className="carousel__item-view-details"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(CarouselItem);
