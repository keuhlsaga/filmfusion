import React, { useEffect, useRef, useState } from "react";
import { BASE_URL, FILE_SIZE } from "../../utils/utils.js";
import { movieGenres, tvGenres } from "../../utils/genres.js";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaArrowRight, FaStar } from "react-icons/fa6";
import { BiCameraMovie } from "react-icons/bi";
import { GiTv } from "react-icons/gi";

const useHasTouch = () => {
  const [hasTouch, setHasTouch] = useState(false);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setHasTouch(isTouchDevice);
  }, []);

  return hasTouch;
};

const Slider = ({ data, mediaType, heading, viewAllUrl }) => {
  const [index, setIndex] = useState(0);
  const [sliderCount, setSliderCount] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideNext, setSlideNext] = useState(false);
  const sliderRef = useRef(null);
  const previousButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const slidesCount = Math.ceil(data.length / sliderCount);
  const cardWidth = sliderRef.current?.firstElementChild.offsetWidth + 12;
  const isMobile = window.innerWidth <= 992;

  /* 
  const handlePreviousClick = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    sliderRef.current.scrollLeft += sliderCount * cardWidth;
    if (index < slidesCount - 1) {
      setIndex((prev) => prev + 1);
    }
  }; */

  const handlePreviousClick = () => {
    if (!isAnimating && index > 0) {
      setIsAnimating(true);
      setIndex((prev) => prev - 1);
      setSlideNext(false);
      sliderRef.current.scrollBy({
        left: sliderCount * -cardWidth,
      });
    }
  };

  const handleNextClick = () => {
    console.log(slidesCount);
    if (!isAnimating && index < slidesCount - 1) {
      setIsAnimating(true);
      setIndex((prev) => prev + 1);
      setSlideNext(true);
      sliderRef.current.scrollBy({
        left: sliderCount * cardWidth,
      });
    }
  };

  const handleWheel = (e) => {
    if (e.deltaY !== 0) return;
    e.preventDefault();
  };

  const handleOnScrollEnd = (e) => {
    setIsAnimating(false);
  };

  const handleOnScroll = (e) => {
    // if (isMobile) return;
    const scrollLeft = e.target.scrollLeft;
    // Check if the scroll is at the beginning
    if (
      scrollLeft === 0 &&
      !previousButtonRef.current.classList.contains("slider__btn--hidden")
    ) {
      previousButtonRef.current.classList.add("slider__btn--hidden");
    } else {
      previousButtonRef.current.classList.remove("slider__btn--hidden");
    }
    // Check if the scroll is at the end
    if (
      scrollLeft === e.target.scrollWidth - e.target.clientWidth &&
      !nextButtonRef.current.classList.contains("slider__btn--hidden")
    ) {
      nextButtonRef.current.classList.add("slider__btn--hidden");
    } else {
      nextButtonRef.current.classList.remove("slider__btn--hidden");
    }
  };

  const handleMouseEnter = (e) => {
    if (isMobile) return; // Skip animation on mobile devices

    const card = e.currentTarget;
    const left = card.getBoundingClientRect().left;
    const cardInfo = card.querySelector(".slider__card-info");

    if (left > sliderRef.current.clientWidth / 2) {
      card.classList.add("slider__card--reverse");
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.classList.remove("slider__card--reverse");
  };

  useEffect(() => {
    // sliderRef.current.scrollLeft = index * sliderCount * cardWidth;
    // if (slideNext) {
    //   sliderRef.current.scrollBy({
    //     left: sliderCount * cardWidth,
    //   });
    //   return;
    // }
    // sliderRef.current.scrollBy({
    //   left: sliderCount * cardWidth * -1,
    // });
  }, [index]);

  useEffect(() => {
    setSliderCount(
      Math.floor(
        sliderRef.current.parentElement.offsetWidth /
          (sliderRef.current.firstElementChild.offsetWidth + 12)
      )
    );
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      const element = sliderRef.current;
      element.addEventListener("wheel", handleWheel);

      return () => {
        element.removeEventListener("wheel", handleWheel);
      };
    }
  }, [sliderRef]);

  const getTitle = (data) => {
    if (mediaType === "movie") {
      return data.title;
    }

    return data.name;
  };

  const getYear = (data) => {
    if (mediaType === "movie") {
      return new Date(data.release_date).getFullYear() || "Unknown year";
    }

    return new Date(data.first_air_date).getFullYear() || "Unknown year";
  };

  return (
    <div className="slider">
      <div className="slider__header">
        <h2 className="slider__heading">
          {mediaType === "movie" ? <BiCameraMovie /> : <GiTv />}
          {heading}
        </h2>
        <Link to={viewAllUrl} className="slider__view-all" draggable="false">
          View all
          <FaArrowRight className="slider__arrow-right" />
        </Link>
      </div>
      <div className="slider__body">
        <div
          className="slider__inner"
          onScroll={handleOnScroll}
          ref={sliderRef}
          onScrollEnd={handleOnScrollEnd}
        >
          {data.map((item) => (
            <Link
              key={item.id}
              to={`/${mediaType}/${item.id}`}
              state={{ data: item }}
              className="slider__link"
              draggable="false"
            >
              <div
                className="slider__card"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  className="slider__card-img"
                  src={BASE_URL + FILE_SIZE.W500 + item.poster_path}
                  alt={getTitle(item)}
                  loading="lazy"
                  draggable="false"
                />
                {!isMobile && (
                  <div className="slider__card-info">
                    <h3 className="slider__card-title">{getTitle(item)}</h3>
                    <div className="slider__card-details">
                      <span className="slider__card-year">{getYear(item)}</span>
                      <span className="slider__card-rating">
                        <FaStar />
                        {item.vote_average.toFixed(1)}
                      </span>
                    </div>
                    <div className="slider__card-genres">
                      {item.genre_ids.map((id) => (
                        <span key={id}>
                          {mediaType === "movie"
                            ? movieGenres.find((genre) => genre.id === id)
                                ?.name || "Unknown Genre"
                            : tvGenres.find((genre) => genre.id === id)?.name ||
                              "Unknown Genre"}
                        </span>
                      ))}
                    </div>
                    <p className="slider__card-overview">{item.overview}</p>
                  </div>
                )}
              </div>
            </Link>
          ))}
          <button
            className="slider__btn slider__btn--prev slider__btn--hidden"
            type="button"
            aria-label="Previous"
            onClick={handlePreviousClick}
            ref={previousButtonRef}
          >
            <FaAngleLeft />
          </button>
          <button
            className="slider__btn slider__btn--next"
            type="button"
            aria-label="Next"
            onClick={handleNextClick}
            ref={nextButtonRef}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
