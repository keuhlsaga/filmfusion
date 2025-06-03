import React, { useEffect, useRef, useState } from "react";
import CarouselSlider from "./CarouselSlider";
import CarouselItem from "./CarouselItem";

const Carousel = ({ data }) => {
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const carouselSlideTime = 10000;

  useEffect(() => {
    const autoSlide = setTimeout(() => {
      setActiveCarouselIndex((prev) => {
        if (prev === data.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, carouselSlideTime);

    return () => {
      clearTimeout(autoSlide);
    };
  }, [activeCarouselIndex]);

  return (
    <>
      <section className="carousel" role="slider">
        {data.map((item, index) => (
          <CarouselItem
            key={item.id}
            item={item}
            isActive={activeCarouselIndex === index}
          />
        ))}
        <CarouselSlider
          data={data}
          activeCarouselIndex={activeCarouselIndex}
          setActiveCarouselIndex={setActiveCarouselIndex}
        />
      </section>
    </>
  );
};

export default Carousel;
