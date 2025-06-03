import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Searchbar from "../searchbar/Searchbar";

const Header = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSearchbarRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const subMenuRef = useRef(null);
  const location = useLocation();

  const handleMenuClick = (e) => {
    e.target.setAttribute("aria-expanded", true);
    mobileMenuRef.current.classList.toggle("header__nav-list--show");
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsSearching((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (subMenuOpen && !e.target.closest(".header__nav-item--menu")) {
      subMenuRef.current.classList.remove("header__nav-sub-list--show");
      setSubMenuOpen(false);
    }
  };

  useEffect(() => {
    if (subMenuOpen) {
      window.addEventListener("click", handleClickOutside);

      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }
  }, [subMenuOpen]);

  return (
    <>
      <header
        // TODO
        // className={`header${
        //   ["/home", "/"].includes(location.pathname) ? " header--home" : ""
        // }`}
        className="header header--home"
        role="banner"
      >
        <Link to="/" className="header__logo" aria-label="Home">
          FilmFusion
        </Link>
        <nav className="header__nav">
          <button
            type="button"
            className="btn btn--menu"
            aria-expanded="false"
            onClick={handleMenuClick}
          >
            <FaBars />
          </button>
          <ul className="header__nav-list" id="navbar" ref={mobileMenuRef}>
            <li className="header__nav-item header__nav-item--menu-close">
              <button type="button" className="btn" onClick={handleMenuClick}>
                <FaArrowLeft />
                <span className="header__logo">FilmFusion</span>
              </button>
            </li>
            <li className="header__nav-item">
              <Link to="/home" className="header__nav-link">
                Home
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/movie" className="header__nav-link">
                Movies
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/tv" className="header__nav-link">
                TV Shows
              </Link>
            </li>
            <li className="header__nav-item">
              <a
                href="#"
                className="header__nav-link"
                onClick={handleSearchClick}
                ref={toggleSearchbarRef}
              >
                Search
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {isSearching && (
        <Searchbar isSearching={isSearching} setIsSearching={setIsSearching} />
      )}
    </>
  );
};

export default Header;
