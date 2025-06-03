import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Searchbar = ({ isSearching, setIsSearching, toggleSearchbarRef }) => {
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef(null);

  const handleChange = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchInput(search);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    searchInputRef.current.focus();
  };

  // TODO
  const handleClickOutside = (e) => {
    // if (
    //   isSearching &&
    //   !e.target.closest(".searchbar") &&
    //   !e.target.closest(toggleSearchbarRef.current)
    // ) {
    //   setIsSearching((prev) => !prev);
    // }
  };

  useEffect(() => {}, [searchInput]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section className="searchbar">
      <div className="searchbar__container">
        <select className="searchbar__category" name="category" id="category">
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        <label className="searchbar__icon" htmlFor="search-input">
          <FaSearch />
        </label>
        <input
          className="searchbar__search-input"
          type="text"
          placeholder="Search notes"
          name="search-input"
          id="search-input"
          value={searchInput}
          aria-label="Search"
          onChange={handleChange}
          ref={searchInputRef}
        />
        <button
          className="btn btn--clear"
          type="button"
          onClick={handleClearSearch}
        >
          <FaX />
        </button>
      </div>
    </section>
  );
};

export default Searchbar;
