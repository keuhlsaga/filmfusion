import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaBars, FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Searchbar from "../searchbar/Searchbar";
import useScrollLock from "../../utils/useScrollLock";
import { FaX } from "react-icons/fa6";
import useOutsideClick from "../../hooks/useOutsideClick";

const Header = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSearchbarRef = useRef(null);
  const toggleMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const subMenuRef = useRef(null);
  const location = useLocation();

  useScrollLock(menuOpen);

  const handleMenuClick = (e) => {
    setMenuOpen((prev) => !prev);
    toggleMenuRef.current.setAttribute(
      "aria-expanded",
      toggleMenuRef.current.getAttribute("aria-expanded") === "true"
        ? "false"
        : "true"
    );

    mobileMenuRef.current.classList.toggle("header__nav-list--show");
  };

  const handleLinkClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsSearching((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    /* if (subMenuOpen && !e.target.closest(".header__nav-item--menu")) {
      subMenuRef.current.classList.remove("header__nav-sub-list--show");
      setSubMenuOpen(false);
    } */
    if (
      toggleMenuRef.current &&
      mobileMenuRef.current &&
      !toggleMenuRef.current.contains(e.target) &&
      !mobileMenuRef.current.contains(e.target)
    ) {
      // mobileMenuRef.current.classList.toggle("header__nav-list--show");
      setMenuOpen(false);
    }
  };

  /*  useEffect(() => {
    if (subMenuOpen) {
      window.addEventListener("click", handleClickOutside);

      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }
  }, [subMenuOpen]); */

  useEffect(() => {
    // toggleMenuRef.current.setAttribute(
    //   "aria-expanded",
    //   toggleMenuRef.current.getAttribute("aria-expanded") === "true"
    //     ? "false"
    //     : "true"
    // );
    // mobileMenuRef.current.classList.toggle("header__nav-list--show");
    /* if (menuOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    }; */
  }, [menuOpen]);

  return (
    <>
      <header
        // TODO
        // className={`header${
        //   ["/home", "/"].includes(location.pathname) ? " header--floating" : ""
        // }`}
        className="header header--floating"
      >
        <button
          type="button"
          className="btn btn--menu"
          aria-expanded="false"
          aria-label="menu button"
          onClick={handleMenuClick}
          ref={toggleMenuRef}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <Link to="/" className="header__logo" aria-label="Home">
          FilmFusion
        </Link>
        <nav className="header__nav">
          <ul className="header__nav-list" id="navbar" ref={mobileMenuRef}>
            {/* <li className="header__nav-item header__nav-item--menu-close">
              <button type="button" className="btn" onClick={handleMenuClick}>
                <FaArrowLeft />
              </button>
            </li> */}
            <li className="header__nav-item">
              <Link
                to="/home"
                className="header__nav-link"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/movie"
                className="header__nav-link"
                onClick={handleLinkClick}
              >
                Movies
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/tv"
                className="header__nav-link"
                onClick={handleLinkClick}
              >
                TV Shows
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn--toggle-search"
            onClick={handleSearchClick}
            ref={toggleSearchbarRef}
          >
            {!isSearching ? <FaSearch /> : <FaX />}
          </button>
        </nav>
      </header>

      {isSearching && <Searchbar setIsSearching={setIsSearching} />}
    </>
  );
};

export default Header;
