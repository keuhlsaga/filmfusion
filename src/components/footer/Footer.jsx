import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        This product uses the TMDB API but is not endorsed or certified by
        <Link to="https://www.themoviedb.org">
          <img
            className="tmdb-logo"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="The Movie Database (TMDB)"
            width="154"
            height="20"
          />
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
