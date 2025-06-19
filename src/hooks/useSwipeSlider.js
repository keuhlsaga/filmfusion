import React, { useCallback, useRef, useState } from "react";

const useSwipeSlider = (totalSlides, options = {}) => {
  const {
    minSwipeDistance = 50,
    swipeThreshold = 0.3,
    loop = true,
    onSlideChange = null,
  } = options;
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const newIndex = loop
        ? (prev + 1) % totalSlides
        : Math.min(prev + 1, totalSlides - 1);

      if (onSlideChange) {
        onSlideChange(newIndex);
      }

      return newIndex;
    });
  }, [totalSlides, loop]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const newIndex = loop
        ? (prev - 1 + totalSlides) % totalSlides
        : Math.min(prev - 1, 0);

      if (onSlideChange) {
        onSlideChange(newIndex);
      }

      return newIndex;
    });
  }, [totalSlides, loop]);

  const goToSlide = useCallback(
    (index) => {
      if (index >= 0 && index < totalSlides) {
        setActiveIndex(index);
        if (onSlideChange) {
          onSlideChange(index);
        }
      }
    },
    [totalSlides, onSlideChange]
  );

  const handleTouchStart = useCallback((e) => {
    isDragging.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current) return;

    const touchCurrentX = e.touches[0].clientX;
    const touchCurrentY = e.touches[0].clientY;
    const deltaX = Math.abs(touchCurrentX - touchStartX.current);
    const deltaY = Math.abs(touchCurrentY - touchStartY.current);

    if (deltaX > deltaY) {
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!isDragging.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;

    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    const swipeDistance = Math.abs(deltaX);

    if (isHorizontalSwipe && swipeDistance > minSwipeDistance) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isDragging.current = false;
  }, []);

  const swipeHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };

  return {
    activeIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    swipeHandlers,
  };
};

export default useSwipeSlider;
