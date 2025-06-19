import React, { useEffect, useRef, useState } from "react";
import CarouselSlider from "./CarouselSlider";
import CarouselItem from "./CarouselItem";
import { FaX } from "react-icons/fa6";
import useScrollLock from "../../utils/useScrollLock";
import { IS_MOBILE } from "../../utils/utils";

const Carousel = ({ data }) => {
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [trailer, setTrailer] = useState({
    title: "",
    video: null,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const trailerModalRef = useRef(null);
  const carouselSlideTime = 10000;
  const timeOutRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startClientX, setStartClientX] = useState(null);
  const [endClientX, setEndClientX] = useState(null);

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
    alert("closed");
    trailerModalRef.current.classList.toggle("carousel__trailer-modal--close");
    setTimeout(() => {
      trailerModalRef.current.classList.toggle(
        "carousel__trailer-modal--close"
      );
      trailerModalRef.current.close();
      setTrailer({
        title: "",
        video: null,
      });
      autoSlide();
      setModalOpen(false);
    }, 300);
  };

  const handleTouchStart = (e) => {
    setStartClientX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setIsDragging(true);
    setEndClientX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (isDragging) {
      if (startClientX - endClientX >= 50) {
        setActiveCarouselIndex((prev) => {
          if (prev === data.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      } else if (startClientX - endClientX <= -50) {
        setActiveCarouselIndex((prev) => {
          if (prev === 0) {
            return data.length - 1;
          }
          return prev - 1;
        });
      }
    }
    setIsDragging(false);
  };

  const handlePopState = (e) => {
    // Close the modal if the popstate event is triggered
    alert("here");
    if (e.state?.modal) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    autoSlide();

    return () => {
      clearTimeout(timeOutRef.current);
    };
  }, [activeCarouselIndex]);

  useEffect(() => {
    if (trailer.video !== null) {
      trailerModalRef.current.showModal();
      clearTimeout(timeOutRef.current);
      setModalOpen(true);
      window.history.pushState({ modal: true }, "");
    }
    console.log(trailer);
  }, [trailer]);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      e.preventDefault();
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    if (modalOpen) {
      window.addEventListener("keydown", handleEscapeKey);
    }
    window.addEventListener("popstate", () => {
      window.history.back();
      alert("here");
    });

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [modalOpen]);

  return (
    <>
      <section
        className="carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
            title={trailer.title}
            src={`https://www.youtube.com/embed/${trailer.video}?autoplay=1`}
            allowFullScreen
          ></iframe>
        </dialog>
      </section>
    </>
  );
};

export default Carousel;
