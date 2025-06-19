import React, { useEffect, useRef } from "react";

const useDebounce = ({ callback, delay }) => {
  const timeout = useRef(null);

  useEffect(() => {
    timeout.current = setTimeout(callback, delay);
    console.log("there");
  }, [callback]);

  return null;
};

export default useDebounce;
