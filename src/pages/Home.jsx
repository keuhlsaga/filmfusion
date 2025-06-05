import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Carousel from "../components/carousel/Carousel";
import Searchbar from "../components/searchbar/Searchbar";
import Slider from "../components/slider/Slider";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa6";

const Home = () => {
  const [trending, setTrending] = useState(null);
  const [movieData, setMovieData] = useState({
    nowPlaying: null,
    popular: null,
    topRated: null,
    upcoming: null,
  });
  const [tvData, setTvData] = useState({
    airingToday: null,
    onTheAir: null,
    popular: null,
    topRated: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [scrollTopVisibility, setScrollTopVisibility] = useState(false);
  const isMobile = window.innerWidth <= 992;

  useEffect(() => {
    if (!localStorage.getItem("filmfusion")) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_AUTH}`,
        },
      };

      const fetchAllData = async (url) => {
        try {
          const [
            trendingRes,
            movieNowPlayingRes,
            moviePopularRes,
            movieTopRatedRes,
            movieUpcomingRes,
            tvAiringTodayRes,
            tvOnTheAirRes,
            tvPopularRes,
            tvTopRatedRes,
          ] = await Promise.all([
            fetch(
              "https://api.themoviedb.org/3/trending/all/day?language=en-US",
              options
            ),
            fetch(
              "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
              options
            ),
            fetch(
              "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
              options
            ),
            fetch(
              "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
              options
            ),
            fetch(
              "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
              options
            ),
            fetch(
              "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
              options
            ),
            fetch(
              "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
              options
            ),
            fetch(
              "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
              options
            ),
            fetch(
              "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
              options
            ),
          ]);

          const [
            trending,
            movieNowPlaying,
            moviePopular,
            movieTopRated,
            movieUpcoming,
            tvAiringToday,
            tvOnTheAir,
            tvPopular,
            tvTopRated,
          ] = await Promise.all([
            trendingRes.json(),
            movieNowPlayingRes.json(),
            moviePopularRes.json(),
            movieTopRatedRes.json(),
            movieUpcomingRes.json(),
            tvAiringTodayRes.json(),
            tvOnTheAirRes.json(),
            tvPopularRes.json(),
            tvTopRatedRes.json(),
          ]);

          setTrending(trending.results);

          setMovieData({
            nowPlaying: movieNowPlaying.results,
            popular: moviePopular.results,
            topRated: movieTopRated.results,
            upcoming: movieUpcoming.results,
          });

          setTvData({
            airingToday: tvAiringToday.results,
            onTheAir: tvOnTheAir.results,
            popular: tvPopular.results,
            topRated: tvTopRated.results,
          });

          localStorage.setItem(
            "filmfusion",
            JSON.stringify({
              trending: trending.results,
              movie: {
                nowPlaying: movieNowPlaying.results,
                popular: moviePopular.results,
                topRated: movieTopRated.results,
                upcoming: movieUpcoming.results,
              },
              tv: {
                airingToday: tvAiringToday.results,
                onTheAir: tvOnTheAir.results,
                popular: tvPopular.results,
                topRated: tvTopRated.results,
              },
            })
          );
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchAllData();
    } else {
      console.log(
        "locale storage",
        JSON.parse(localStorage.getItem("filmfusion"))
      );
      setTrending(JSON.parse(localStorage.getItem("filmfusion")).trending);

      setMovieData(JSON.parse(localStorage.getItem("filmfusion")).movie);

      setTvData(JSON.parse(localStorage.getItem("filmfusion")).tv);
      setIsLoading(false);
    }

    const scrollListener = () => {
      if (window.scrollY > window.innerHeight) {
        setScrollTopVisibility(true);
      }

      if (window.scrollY < window.innerHeight) {
        setScrollTopVisibility(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  if (isLoading) {
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
        <Carousel data={trending} />

        <section className="content-section">
          {!isMobile && (
            <div className="content-section__label-container">
              <span className="content-section__label">MOVIES</span>
            </div>
          )}
          <div className="content-section__sliders-container">
            <Slider
              data={movieData.nowPlaying}
              mediaType="movie"
              heading="Now Playing"
              viewAllUrl="/"
            />
            <Slider
              data={movieData.popular}
              mediaType="movie"
              heading="Popular"
              viewAllUrl="/"
            />
            <Slider
              data={movieData.topRated}
              mediaType="movie"
              heading="Top Rated"
              viewAllUrl="/"
            />
            <Slider
              data={movieData.upcoming}
              mediaType="movie"
              heading="Upcoming"
              viewAllUrl="/"
            />
          </div>
        </section>
        <section className="content-section">
          {!isMobile && (
            <div className="content-section__label-container">
              <span className="content-section__label">TELEVISION SHOWS</span>
            </div>
          )}
          <div className="content-section__sliders-container">
            <Slider
              data={tvData.airingToday}
              mediaType="tv"
              heading="Airing Today"
              viewAllUrl="/"
            />
            <Slider
              data={tvData.onTheAir}
              mediaType="tv"
              heading="On The Air"
              viewAllUrl="/"
            />
            <Slider
              data={tvData.popular}
              mediaType="tv"
              heading="Popular"
              viewAllUrl="/"
            />
            <Slider
              data={tvData.topRated}
              mediaType="tv"
              heading="Upcoming"
              viewAllUrl="/"
            />
          </div>
        </section>
        {scrollTopVisibility && (
          <button
            type="button"
            className="btn btn--to-top"
            onClick={() => {
              window.scroll(0, 0);
            }}
          >
            <FaChevronUp />
          </button>
        )}
      </main>
    </>
  );
};

export default Home;
