import React, { use, useEffect, useState } from "react";
import { getImageSource } from "../../utils/utils.js";

const CarouselSlider = ({
  data,
  activeCarouselIndex,
  setActiveCarouselIndex,
}) => {
  const [activeSliderIndex, setActiveSliderIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const slideTwice = (first, second) => {
    setActiveSliderIndex(first);
    setTimeout(() => {
      setActiveSliderIndex(second);
      setActiveCarouselIndex(second);
    }, 300); // 300ms slider item transition duration
  };

  const handleClick = (index) => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Slide left twice
    if (activeSliderIndex <= 1 && activeSliderIndex - index < -2) {
      if (data.length - 1 === index) {
        slideTwice(0, data.length - 1);
      }
      if (data.length - 2 === index) {
        slideTwice(data.length - 1, data.length - 2);
      }
      return;
    }
    if (activeSliderIndex - index === 2) {
      slideTwice(activeSliderIndex - 1, activeSliderIndex - 2);
      return;
    }

    // Slide right twice
    if (activeSliderIndex >= data.length - 2 && activeSliderIndex - index > 2) {
      if (index === 0) {
        slideTwice(data.length - 1, 0);
      }
      if (index === 1) {
        slideTwice(0, 1);
      }
      return;
    }
    if (activeSliderIndex - index === -2) {
      slideTwice(activeSliderIndex + 1, activeSliderIndex + 2);
      return;
    }

    // Slide once
    setActiveSliderIndex(index);
    setActiveCarouselIndex(index);
  };

  const getClassName = (index) => {
    let className = "carousel__slider-item";

    if (activeSliderIndex === index) {
      className += " carousel__slider-item--active";
    }

    if (activeSliderIndex === 0) {
      if (index === data.length - 1) {
        className += " carousel__slider-item--prev-1";
      } else if (index === data.length - 2) {
        className += " carousel__slider-item--prev-2";
      }
    } else if (activeSliderIndex === data.length - 1) {
      if (index === 0) {
        className += " carousel__slider-item--next-1";
      } else if (index === 1) {
        className += " carousel__slider-item--next-2";
      }
    }

    if (activeSliderIndex === 1) {
      if (index === data.length - 1) {
        className += " carousel__slider-item--prev-2";
      }
    } else if (activeSliderIndex === data.length - 2) {
      if (index === 0) {
        className += " carousel__slider-item--next-2";
      }
    }

    if (activeSliderIndex - 1 === index) {
      className += " carousel__slider-item--prev-1";
    } else if (activeSliderIndex - 2 === index) {
      className += " carousel__slider-item--prev-2";
    } else if (activeSliderIndex + 1 === index) {
      className += " carousel__slider-item--next-1";
    } else if (activeSliderIndex + 2 === index) {
      className += " carousel__slider-item--next-2";
    }

    return className;
  };

  useEffect(() => {
    setActiveSliderIndex(activeCarouselIndex);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  }, [activeCarouselIndex]);

  return (
    <div className="carousel__slider" role="slider">
      {data.map((item, index) => (
        <div
          key={item.id}
          className={getClassName(index)}
          role="button"
          onClick={() => handleClick(index)}
        >
          <img
            className="carousel__slider-img"
            src={getImageSource(item.poster_path, "w500")}
            alt={data.title}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default CarouselSlider;
