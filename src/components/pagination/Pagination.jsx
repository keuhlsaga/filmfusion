import { memo, useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Pagination = ({
  pageCount = null,
  activePage = 0,
  onPageChange,
  loop = false,
  pageDisplayRange = 5,
  timeoutDelay = 0,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const btnPrev = useRef(null);
  const btnNext = useRef(null);

  const handleChangePage = (pageNumber) => {
    if (
      pageNumber < 0 ||
      pageNumber >= pageCount ||
      activePage === pageNumber ||
      isAnimating
    ) {
      return;
    }

    if (timeoutDelay > 0) {
      setIsAnimating(true);
    }
    onPageChange(pageNumber);
  };

  const handlePrevPage = () => {
    handleChangePage(
      loop ? (activePage - 1 + pageCount) % pageCount : activePage - 1
    );
  };

  const handleNextPage = () => {
    handleChangePage(loop ? (activePage + 1) % pageCount : activePage + 1);
  };

  useEffect(() => {
    setTimeout(() => setIsAnimating(false), timeoutDelay);
  }, [activePage]);

  return (
    <div className="pagination">
      <button
        type="button"
        className="btn"
        aria-label="previous page"
        onClick={handlePrevPage}
        disabled={activePage === 0 && !loop}
        ref={btnPrev}
      >
        <FaAngleLeft />
      </button>
      <ul className="pagination__pages">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((num, i) => (
          <li key={num} className="pagination__page">
            <button
              type="button"
              data-index={i}
              className={`btn${activePage === i ? " btn--active" : ""}`}
              aria-label={`page ${num}`}
              onClick={() => handleChangePage(i)}
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="btn"
        aria-label="next page"
        onClick={handleNextPage}
        ref={btnNext}
        disabled={activePage === pageCount - 1 && !loop}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;
