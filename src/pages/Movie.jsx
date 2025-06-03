import React, { use, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import { BASE_URL, FILE_SIZE } from "../utils/utils";

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
  const id = useParams()?.id;
  const data = useLocation()?.state?.data;

  useEffect(() => {
    if (id) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODYwMGVlMDc4YTdlNzJkNWFiYzIyMDY1YjQ5YjMzYSIsIm5iZiI6MTY3NDE5MjAyNC4xOTYsInN1YiI6IjYzY2EyNDk4MDM5OGFiMDBjYzFiMzQ0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lWsHrzzR4-QycjJuQUXHubaThDvagXzmI8blvVYKzsk",
        },
      };

      fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then((res) => res.json())
        .then((res) => setDetails(res))
        .catch((err) => console.error(err));

      fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
        options
      )
        .then((res) => res.json())
        .then((res) => setCredits(res))
        .catch((err) => console.error(err));

      fetch(
        "https://api.themoviedb.org/3/movie/822119/videos?language=en-US",
        options
      )
        .then((res) => res.json())
        .then((res) => setVideos(res))
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
      console.log("Videos:", videos);
    }
    console.log("Crew details:", credits?.cast);
  }, [details, credits]);

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
              alt={data.title || data.name}
              className="content__banner"
            />
            <div className="content__container">
              <div className="content__aside">
                <img
                  src={`${BASE_URL}${FILE_SIZE.ORIGINAL}${data.poster_path}`}
                  alt={data.title || data.name}
                  className="content__poster"
                />
                <div className="group">
                  <h2>Director</h2>
                  <p>{people.director}</p>
                </div>
                <div className="group">
                  <h2>Writers</h2>
                  <p>{people.writers.join(", ")}</p>
                </div>
              </div>
              <div className="content__title">
                <div>
                  <div>
                    <h1>{data.title || data.name}</h1>
                    <div>
                      <span className="content__year">
                        {new Date(
                          data.release_date || data.first_air_date
                        ).getFullYear()}
                      </span>
                      <span className="content__rating">
                        {data.vote_average.toFixed(1)}
                      </span>
                    </div>
                    <div className="content_genres">
                      {details.genres.map((genre) => genre.name).join(" / ")}
                      {console.log("details", details)}
                    </div>
                  </div>
                  <div>Bookmark</div>
                </div>
                <div>
                  <p>
                    Budget - <span>{details.budget}</span>
                  </p>
                </div>
              </div>
              <div className="content__details">
                <ul className="content__tabs">
                  <li className="content__tab active">Overview</li>
                  <li className="content__tab">Cast</li>
                  <li className="content__tab">Videos</li>
                  <li className="content__tab">Reviews</li>
                </ul>
                <div className="content__overview">
                  <h2>Overview</h2>
                  <p>{details.overview}</p>
                </div>
                <div className="content__cast">
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
                <div className="content__videos">
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
    </>
  );
};

export default Movie;
