import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import Carousel from "../components/carousel/Carousel";
import Slider from "../components/slider/Slider";
import Footer from "../components/footer/Footer";
import { FaArrowRight, FaChevronUp } from "react-icons/fa6";
import { apiFetch, getImageSource, OPTIONS } from "../utils/utils";
import Loading from "../components/loading/Loading";
import { Link } from "react-router-dom";
import Pagination from "../components/pagination/Pagination";
import { imageSizes } from "../utils/imageSizes";
import Trending from "../components/trending/Trending";

const Home = () => {
  const [trending, setTrending] = useState(null);
  const [featuring, setFeaturing] = useState(null);
  const [popular, setPopular] = useState({
    movie: null,
    tv: null,
  });
  const [loading, setLoading] = useState(false);
  const [scrollTopVisibility, setScrollTopVisibility] = useState(false);
  const isMobile = window.innerWidth <= 992;

  const fetchData = async () => {
    try {
      const promises = [
        apiFetch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          OPTIONS
        ),
        apiFetch(
          "https://api.themoviedb.org/3/trending/all/day?language=en-US",
          OPTIONS
        ),
        apiFetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          OPTIONS
        ),
        apiFetch(
          "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
          OPTIONS
        ),
      ];

      const [featuring, trending, popularMovie, popularTv] = await Promise.all(
        promises
      );

      setFeaturing(featuring.results);
      setTrending(trending.results);
      setPopular({
        movie: popularMovie.results,
        tv: popularTv.results,
      });

      localStorage.setItem(
        "filmfusion",
        JSON.stringify({
          featuring: featuring.results,
          trending: trending.results,
          popular: {
            movie: popularMovie.results,
            tv: popularTv.results,
          },
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (!localStorage.getItem("filmfusion")) {
      // if (true) {
      setTimeout(() => {
        fetchData();
        /*  (async () => {
          try {
            const promises = [
              apiFetch(
                "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
                OPTIONS
              ),
              apiFetch(
                "https://api.themoviedb.org/3/trending/all/day?language=en-US",
                OPTIONS
              ),
              apiFetch(
                "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
                OPTIONS
              ),
              apiFetch(
                "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
                OPTIONS
              ),
            ];

            const [featuring, trending, popularMovie, popularTv] =
              await Promise.all(promises);

            setFeaturing(featuring.results);
            setTrending(trending.results);
            setPopular({
              movie: popularMovie.results,
              tv: popularTv.results,
            });

            localStorage.setItem(
              "filmfusion",
              JSON.stringify({
                featuring: featuring.results,
                trending: trending.results,
                popular: {
                  movie: popularMovie.results,
                  tv: popularTv.results,
                },
              })
            );
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        })(); */
      }, 10);
    } else {
      setFeaturing(JSON.parse(localStorage.getItem("filmfusion")).featuring);
      setTrending(JSON.parse(localStorage.getItem("filmfusion")).trending);
      setPopular(JSON.parse(localStorage.getItem("filmfusion")).popular);
      setLoading(false);
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

  useEffect(() => {
    if (featuring) {
    }
  }, [featuring]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <main>
        {featuring && <Carousel data={featuring.slice(0, 8)} />}

        <section className="content-section">
          <div className="content-section__header">
            <h2 className="content-section__heading">Trending Today</h2>
          </div>
          {trending && (
            <Trending data={trending} pageCount={trending.length / 4} />
          )}
        </section>
        <section className="content-section">
          <div className="content-section__header">
            <h2 className="content-section__heading">Popular Movies</h2>
            <Link
              to="/movie"
              className="content-section__view-all"
              draggable="false"
            >
              View all
              <FaArrowRight className="content-section__view-all-post" />
            </Link>
          </div>
          {popular.movie && (
            <>
              <Slider data={popular.movie} mediaType="movie" viewAllUrl="/" />
            </>
          )}
        </section>
        <section className="content-section">
          <div className="content-section__header">
            <h2 className="content-section__heading">Popular Tv Shows</h2>
            <Link
              to="/tv"
              className="content-section__view-all"
              draggable="false"
            >
              View all
              <FaArrowRight className="content-section__view-all-post" />
            </Link>
          </div>
          {popular.tv && (
            <>
              <Slider data={popular.tv} mediaType="tv" viewAllUrl="/" />
            </>
          )}
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
      <Footer />
    </>
  );
};

export default Home;
