import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import useOutsideClick from "../../hooks/useOutsideClick";
import { getImageSource, getYear, OPTIONS } from "../../utils/utils";
import { Link } from "react-router-dom";
import { movieGenres, tvGenres } from "../../utils/genres";

const Searchbar = ({ setIsSearching }) => {
  const [form, setForm] = useState({
    searchInput: "",
    mediaType: "movie",
  });
  const [results, setResults] = useState(null);
  const searchInputRef = useRef(null);
  const searchbarRef = useOutsideClick(() => setIsSearching(false));
  const debounceTimeout = useRef(null);

  const handleSearch = ({ searchInput, mediaType }) => {
    const query = searchInput.split(" ").join("+");
    const url = `https://api.themoviedb.org/3/search/${mediaType}?query=${query}`;

    fetch(url, OPTIONS)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return setResults(data.results);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClearSearch = () => {
    setForm((prev) => {
      return {
        ...prev,
        searchInput: "",
      };
    });
    searchInputRef.current.focus();
  };

  useEffect(() => {
    clearTimeout(debounceTimeout.current);
    if (form.searchInput !== "") {
      debounceTimeout.current = setTimeout(() => {
        handleSearch(form);
      }, 400);
    } else {
      setResults(null);
    }
  }, [form.searchInput]);

  return (
    <>
      <section className="searchbar" ref={searchbarRef}>
        <div className="searchbar__container">
          <select
            className="searchbar__category"
            name="mediaType"
            id="mediaType"
            value={form.mediaType}
            onChange={handleChange}
          >
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>
          <input
            className="searchbar__search-input"
            type="text"
            placeholder="Search notes"
            name="searchInput"
            id="searchInput"
            value={form.searchInput}
            aria-label="Search"
            onChange={handleChange}
            ref={searchInputRef}
            autoFocus
          />
          <button
            className="btn btn--clear"
            type="button"
            onClick={handleClearSearch}
          >
            <FaX />
          </button>
          <button
            className="btn btn--search"
            type="button"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
        </div>
        {results && (
          <ul className="searchbar__result-list">
            {results.length > 0 ? (
              results.map((result) => (
                <li key={result.id} className="searchbar__result-list-item">
                  {/* <a href={`/${form.mediaType}/${result.id}`}>{result.title}</a> */}
                  <Link
                    to={`/${form.mediaType}/${result.id}`}
                    className="searchbar__result-list-link"
                  >
                    <img
                      src={getImageSource(result.poster_path, "w500")}
                      alt={result.title || result.name}
                      className="searchbar__result-list-img"
                    />
                    <div className="searchbar__result-list-info">
                      <h3 className="searchbar__result-list-title">
                        {result.title || result.name}
                      </h3>
                      <div>
                        {result.release_date || result.first_air_date
                          ? getYear(result.release_date) ||
                            getYear(result.first_air_date)
                          : ""}{" "}
                        {result.vote_average
                          ? result.vote_average.toFixed(1)
                          : ""}
                      </div>
                      <div className="searchbar__result-list-genres">
                        {result.genre_ids &&
                          result.genre_ids
                            .map((id) => {
                              let genre = {};
                              if (form.mediaType === "movie") {
                                genre = movieGenres.find(
                                  (genre) => genre.id === id
                                );
                              } else {
                                genre = tvGenres.find(
                                  (genre) => genre.id === id
                                );
                              }
                              return genre.name;
                            })
                            .join(" / ")}
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="searchbar__result-list-item">No results found</li>
            )}
          </ul>
        )}
      </section>
    </>
  );
};

export default Searchbar;
