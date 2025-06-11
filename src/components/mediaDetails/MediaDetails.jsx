import React, { useEffect, useState } from "react";
import { getImageSource, getRunTime, OPTIONS } from "../../utils/utils";
import { FaPlus, FaStar } from "react-icons/fa6";

const MediaDetails = ({ details, credits, videos, people }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const releaseDates = details.release_dates.find(
    (result) => result.iso_3166_1 === "US"
  ).release_dates;
  const ratingCategory = releaseDates[releaseDates.length - 1].certification;

  const handleTabClick = (e) => {
    e.preventDefault();
    setActiveTabIndex(Number(e.currentTarget.getAttribute("data-index")));
  };

  return (
    <section className="content">
      <img
        src={getImageSource(details.backdrop_path)}
        alt={details.title || details.name}
        className="content__banner"
      />
      <div className="content__main-content">
        <div className="content__header">
          <div className="content__header-title">
            <div className="content__header-title-left">
              <h1 className="content__title">
                {details.title || details.name}
                <span className="content__year">
                  {new Date(
                    details.release_date || details.first_air_date
                  ).getFullYear()}
                </span>
              </h1>
              <div className="content_genres">
                {details.genres.map((genre) => genre.name).join(" / ")}
              </div>
              <div>
                <span>{getRunTime(details.runtime)}</span>
                <div className="content__rating">
                  <FaStar />
                  {details.vote_average.toFixed(1)}
                </div>
              </div>
            </div>
            <div className="content__header-title-bookmark">
              <button type="button">
                Add to Watchlist
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="content__header-footer">
            <p>
              Budget -<span className="content__budget">{details.budget}</span>
            </p>
          </div>
        </div>
        <aside className="content__aside">
          <div className="content__poster-container">
            <img
              src={getImageSource(details.poster_path)}
              alt={details.title || details.name}
              className="content__poster"
            />
            <span className="content__rating-category">{ratingCategory}</span>
          </div>
          <div>
            <h2 className="content__aside-heading">Director</h2>
            <p>{people.director}</p>
          </div>
          <div>
            <h2 className="content__aside-heading">Writers</h2>
            <p>{people.writers.join(", ")}</p>
          </div>
        </aside>
        <div className="content__details">
          <ul className="content__tabs">
            <li
              className={`content__tab${
                activeTabIndex === 0 ? " content__tab--active" : ""
              }`}
            >
              <a href="#" data-index="0" onClick={handleTabClick}>
                Overview
              </a>
            </li>
            <li
              className={`content__tab${
                activeTabIndex === 1 ? " content__tab--active" : ""
              }`}
            >
              <a href="#" data-index="1" onClick={handleTabClick}>
                Cast
              </a>
            </li>
            <li
              className={`content__tab${
                activeTabIndex === 2 ? " content__tab--active" : ""
              }`}
            >
              <a href="#" data-index="2" onClick={handleTabClick}>
                Videos
              </a>
            </li>
            <li
              className={`content__tab${
                activeTabIndex === 3 ? " content__tab--active" : ""
              }`}
            >
              <a href="#" data-index="3" onClick={handleTabClick}>
                Reviews
              </a>
            </li>
            <li className="content__tab-indicator"></li>
          </ul>
          <div className="content__details-container">
            <h2>Overview</h2>
            <p className="content__overview">{details.overview}</p>
          </div>
          <div className="content__details-container">
            <h2>Cast</h2>
            <div className="content__cast-list">
              {credits.cast.slice(0, 10).map((cast) => (
                <div key={cast.id} className="content__cast-item">
                  <img
                    src={getImageSource(cast.profile_path, "w500")}
                    alt={cast.name}
                    className="content__cast-img"
                    loading="lazy"
                  />
                  <p className="content__cast-name">{cast.name}</p>
                  <p className="content__cast-character">{cast.character}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="content__details-container">
            {videos
              .filter((video) => video.type === "Trailer")
              .map((video) => (
                <iframe
                  key={video.id}
                  width="420"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  loading="lazy"
                ></iframe>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaDetails;
