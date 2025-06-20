import React from "react";

const Pagination = ({ page, totalPages, setPage }) => (
  <div className="pagination-container">
    <button
      className={`pagination-btn${page === 1 ? " disabled" : ""}`}
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
    >
      &#60;
    </button>
    {[...Array(totalPages)].map((_, idx) => (
      <button
        key={idx + 1}
        className={`pagination-btn${page === idx + 1 ? " active" : ""}`}
        onClick={() => setPage(idx + 1)}
      >
        {idx + 1}
      </button>
    ))}
    <button
      className={`pagination-btn${page === totalPages ? " disabled" : ""}`}
      onClick={() => setPage(page + 1)}
      disabled={page === totalPages}
    >
      &#62;
    </button>
  </div>
);

export default Pagination; 