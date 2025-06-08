import React, { useEffect, useRef, useState } from "react";
import CarouselSlider from "./CarouselSlider";
import CarouselItem from "./CarouselItem";
import { FaX } from "react-icons/fa6";
import useScrollLock from "../../utils/useScrollLock";

const Carousel = ({ data }) => {
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [trailer, setTrailer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const trailerModalRef = useRef(null);
  const carouselSlideTime = 10000;
  const timeOutRef = useRef(null);

  useScrollLock(modalOpen);

  const autoSlide = () => {
    timeOutRef.current = setTimeout(() => {
      setActiveCarouselIndex((prev) => {
        if (prev === data.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, carouselSlideTime);
  };

  const handleCloseModal = () => {
    trailerModalRef.current.classList.toggle("carousel__trailer-modal--close");
    setTimeout(() => {
      trailerModalRef.current.classList.toggle(
        "carousel__trailer-modal--close"
      );
      trailerModalRef.current.close();
      setTrailer(null);
      autoSlide();
      setModalOpen(false);
    }, 300);
  };

  useEffect(() => {
    autoSlide();

    return () => {
      clearTimeout(timeOutRef.current);
    };
  }, [activeCarouselIndex]);

  useEffect(() => {
    if (trailer !== null) {
      trailerModalRef.current.showModal();
      clearTimeout(timeOutRef.current);
      setModalOpen(true);
    }
  }, [trailer]);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      e.preventDefault();
      if (e.key === "Escape") {
        handleCloseModal;
      }
    };

    if (modalOpen) {
      window.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [modalOpen]);

  return (
    <>
      <section className="carousel" role="slider">
        {data.map((item, index) => (
          <CarouselItem
            key={item.id}
            item={item}
            isActive={activeCarouselIndex === index}
            setTrailer={setTrailer}
          />
        ))}
        <CarouselSlider
          data={data}
          activeCarouselIndex={activeCarouselIndex}
          setActiveCarouselIndex={setActiveCarouselIndex}
        />
        <dialog className="carousel__trailer-modal" ref={trailerModalRef}>
          <button
            type="button"
            className="btn btn--close-modal"
            onClick={handleCloseModal}
          >
            <FaX />
          </button>
          <iframe
            className="carousel__trailer-modal-video"
            width="420"
            height="315"
            src={`https://www.youtube.com/embed/${trailer}`}
          ></iframe>
        </dialog>
      </section>
    </>
  );
};

export default Carousel;
