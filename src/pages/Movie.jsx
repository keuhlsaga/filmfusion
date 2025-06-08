import React, { use, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import { BASE_URL, FILE_SIZE, OPTIONS } from "../utils/utils";
import { FaPlus, FaStar } from "react-icons/fa6";
import Footer from "../components/footer/Footer";

const Movie = () => {
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState({
    director: null,
    writers: [],
    cast: [],
  });
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const id = useParams()?.id;
  const data = useLocation()?.state?.data;

  const getTabClassName = (index) => {
    let className = "content__tab";

    if (index === activeTabIndex) {
      className += " content__tab--active";
    }

    return className;
  };

  const handleTabClick = (e) => {
    e.preventDefault();
    setActiveTabIndex(Number(e.currentTarget.getAttribute("data-index")));
  };

  useEffect(() => {
    // const fetchAllData = async () => {
    //   try {
    //     const [detailsRes, creditsRes, videosRes] = await Promise.all([

    //     ])
    //   } catch (error) {

    //   } finally {
    //     setLoading(false);
    //   }
    // }
    if (id) {
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, OPTIONS)
        .then((res) => res.json())
        .then((data) => setDetails(data))
        .catch((err) => console.error(err));

      fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
        OPTIONS
      )
        .then((res) => res.json())
        .then((data) => setCredits(data))
        .catch((err) => console.error(err));

      fetch(
        "https://api.themoviedb.org/3/movie/822119/videos?language=en-US",
        OPTIONS
      )
        .then((res) => res.json())
        .then((data) => setVideos(data))
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    if (details && credits && videos) {
      setLoading(false);
      setPeople({
        director: credits.crew.find((crew) => crew.job === "Director")?.name,
        writers: [
          ...new Set(
            credits.crew
              .filter((crew) => crew.department === "Writing")
              .map((writer) => writer.name)
          ),
        ],
      });
    }
  }, [details, credits, videos]);

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main>
        {!id ? (
          <aside className="sidebar">
            <input type="text" name="" id="" />
          </aside>
        ) : (
          <section className="content">
            <img
              src={`${BASE_URL}${FILE_SIZE.ORIGINAL}${details.backdrop_path}`}
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
                    <div className="content__rating">
                      <FaStar />
                      {details.vote_average.toFixed(1)}
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
                    Budget -
                    <span className="content__budget">{details.budget}</span>
                  </p>
                </div>
              </div>
              <aside className="content__aside">
                <img
                  src={`${BASE_URL}${FILE_SIZE.ORIGINAL}${details.poster_path}`}
                  alt={details.title || details.name}
                  className="content__poster"
                />
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
                          src={`${BASE_URL}${FILE_SIZE.W500}${cast.profile_path}`}
                          alt={cast.name}
                          className="content__cast-img"
                          loading="lazy"
                        />
                        <p className="content__cast-name">{cast.name}</p>
                        <p className="content__cast-character">
                          {cast.character}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="content__details-container">
                  {videos.results
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
        )}
      </main>
      <Footer />
    </>
  );
};

export default Movie;
