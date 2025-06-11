import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const getRandom = (num) => {
    return Math.random() * num;
  };

  const getStylesPosition = () => {
    return {
      top: `${getRandom(100)}%`,
      left: `${getRandom(100)}%`,
      animationDelay: `${getRandom(3000)}ms`,
    };
  };

  return (
    <div className="error-page">
      <div className="error-page__container">
        <div className="error-page__error">404</div>
        <h1 className="error-page__heading">Scene Not Found</h1>
        <p className="error-page__message">
          Oops! It looks like this page took an unexpected plot twist and
          disappeared into the void. Even our best directors couldn't find this
          scene in our movie database.
        </p>
        <Link to="/home" className="btn btn--back-to-home">
          Back to Home
        </Link>
      </div>
      <div className="error-page__stars">
        {Array.from({ length: 100 }, (_, i) => i + 1).map((i) => (
          <div
            key={i}
            className="error-page__star"
            style={getStylesPosition()}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PageNotFound;
