import React, { useEffect, useRef, useState } from "react";
import { getImageSource, getYear } from "../../utils/utils";
import { imageSizes } from "../../utils/imageSizes";
import { FaArrowDown, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { movieGenres, tvGenres } from "../../utils/genres";

const Trending = ({ data, pageCount }) => {
  const [pageData, setPageData] = useState(null);
  const renderIndex = useRef(0);
  const totalRenderCount = data.length / pageCount;

  const renderData = () => {
    renderIndex.current += 1;
    setPageData(data.slice(0, 4 * (renderIndex.current + 1)));
  };

  useEffect(() => {
    setPageData(data.slice(0, 4));
  }, []);

  const getGenres = (mediaType, ids) => {
    return ids.map((id) =>
      mediaType === "movie"
        ? movieGenres.find((genre) => genre.id === id)?.name || "Unknown Genre"
        : tvGenres.find((genre) => genre.id === id)?.name || "Unknown Genre"
    );
  };

  return (
    <div className="trending">
      <div className="trending__cards-container">
        {pageData &&
          pageData.map((obj, index) => (
            <Link key={obj.id} to={`/${obj.media_type}/${obj.id}`}>
              <div className="trending__card">
                <div className="trending__card-label">TRENDING</div>
                <div className="trending__card-left">
                  <h3
                    className="trending__card-count"
                    style={{
                      backgroundImage: `url(${getImageSource(
                        obj.backdrop_path,
                        // obj.poster_path,
                        imageSizes.backdrop.m
                      )})`,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </h3>
                </div>
                <div className="trending__card-right">
                  <img
                    className="trending__card-img"
                    src={getImageSource(
                      obj.backdrop_path,
                      imageSizes.backdrop.m
                    )}
                    // src={getImageSource(
                    //   obj.poster_path,
                    //   imageSizes.poster.m
                    // )}
                    alt={obj.title || obj.name}
                    loading="lazy"
                  />
                </div>
                <div className="trending__card-description">
                  <h3 className="trending__card-title">
                    {obj.title || obj.name}
                  </h3>
                  <div className="trending__card-sub">
                    <span>
                      {getYear(obj.release_date) || getYear(obj.first_air_date)}
                    </span>
                    <span className="trending__card-rating">
                      <FaStar />
                      {obj.vote_average % 1 === 0
                        ? obj.vote_average
                        : obj.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <div className="trending__card-genres">
                    {getGenres(obj.media_type, obj.genre_ids).map(
                      (genre, id) => (
                        <span key={id}>{genre}</span>
                      )
                    )}
                  </div>
                  <p className="trending__card-overview">{obj.overview}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <div className="trending__action">
        {renderIndex.current < totalRenderCount && (
          <button
            type="button"
            className="btn btn--secondary"
            onClick={renderData}
          >
            Show more <FaArrowDown className="btn__post" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Trending;
