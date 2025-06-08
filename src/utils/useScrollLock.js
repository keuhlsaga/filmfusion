import React, { useEffect, useRef } from "react";

const useScrollLock = (isLocked) => {
  // Hook to disable scrolling while keeping scrollbar visible
  const scrollY = useRef(0);

  useEffect(() => {
    if (isLocked) {
      // Store current scroll position
      scrollY.current = window.scrollY;

      // Method 1: Keep scrollbar but disable scroll functionality
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll"; // Keep scrollbar visible

      // Prevent touch scrolling on mobile
      document.body.style.touchAction = "none";

      // Additional mobile fixes
      document.documentElement.style.position = "fixed";
      document.documentElement.style.width = "100%";
      document.documentElement.style.height = "100%";
    } else {
      // Restore original styles
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      document.body.style.touchAction = "";

      document.documentElement.style.position = "";
      document.documentElement.style.width = "";
      document.documentElement.style.height = "";

      // Restore scroll position
      window.scrollTo(0, scrollY.current);
    }

    return () => {
      // Cleanup
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      document.body.style.touchAction = "";
      document.documentElement.style.position = "";
      document.documentElement.style.width = "";
      document.documentElement.style.height = "";
    };
  }, [isLocked]);
};

export default useScrollLock;
