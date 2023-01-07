import React from "react";

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
  const maxPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <nav>
      <ul className="pagination">
        <li>
          <button
            onClick={() => paginate(clamp(currentPage - 10, 1, maxPages))}
          >
            {"<<"}
          </button>
        </li>
        <li>
          <button onClick={() => paginate(clamp(currentPage - 1, 1, maxPages))}>
            {"<"}
          </button>
        </li>
        <li>
          <p>
            {currentPage} / {maxPages}
          </p>
        </li>
        <li>
          <button onClick={() => paginate(clamp(currentPage + 1, 1, maxPages))}>
            {">"}
          </button>
        </li>
        <li>
          <button
            onClick={() => paginate(clamp(currentPage + 10, 1, maxPages))}
          >
            {">>"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export default Pagination;
