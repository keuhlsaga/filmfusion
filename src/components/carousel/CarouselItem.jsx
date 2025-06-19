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
import { imageSizes } from "../../utils/imageSizes.js";
const CarouselItem = ({ item, isActive, setTrailer }) => {
  const [videos, setVideos] = useState(null);
  const [runtime, setRuntime] = useState(null);
  const [ratingCategory, setRatingCategory] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    // TODO use this on final
    // setTrailer({
    //   title: item.title || item.name,
    //   video:
    //     videos.results.filter((video) => video.type === "Trailer")[0].key ||
    //     videos.results[0],
    // });

    // Mock data
    setTrailer({ title: "The Amateur", video: "DCWcK4c-F8Q" });
  };

  useEffect(() => {
    // Mock data
    setRuntime(100);
    setRatingCategory("R");

    // TODO use this on final
    /* (async () => {
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

          if (releaseDates?.release_dates) {
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
    })(); */
  }, []);

  return (
    <div
      className={`carousel__item${isActive ? " carousel__item--active" : ""}`}
    >
      <img
        src={getImageSource(item.backdrop_path, imageSizes.backdrop.l)}
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
          {/* <span>
            {item.media_type
              .slice(0, 1)
              .toUpperCase()
              .concat(item.media_type.slice(1))}
          </span>
          • */}
          <span>{item.release_date}</span>
          {runtime && (
            <>
              •<span>{getRunTime(runtime)}</span>
            </>
          )}
        </div>
        <div className="carousel__item-genres">
          {item.genre_ids.map((id) => (
            <span key={id}>
              {movieGenres.find((genre) => genre.id === id)?.name ||
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
            to={`/movie/${item.id}`}
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
