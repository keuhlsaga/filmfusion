import React, { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(event.target);
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export default useOutsideClick;
