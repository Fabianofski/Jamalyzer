import React, { ReactElement } from "react";

interface Props {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<number>;
}

function Pagination({
  postsPerPage,
  totalPosts,
  currentPage,
  setCurrentPage
}: Props): ReactElement {
  const maxPages = Math.ceil(totalPosts / postsPerPage);
  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <nav>
      <ul className="pagination">
        <li>
          <button
            onClick={() => {
              paginate(clamp(currentPage - 10, 1, maxPages));
            }}>
            {"<<"}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              paginate(clamp(currentPage - 1, 1, maxPages));
            }}>
            {"<"}
          </button>
        </li>
        <li>
          <p>
            {currentPage} / {maxPages}
          </p>
        </li>
        <li>
          <button
            onClick={() => {
              paginate(clamp(currentPage + 1, 1, maxPages));
            }}>
            {">"}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              paginate(clamp(currentPage + 10, 1, maxPages));
            }}>
            {">>"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

function clamp(number: number, min: number, max: number): number {
  return Math.max(min, Math.min(number, max));
}

export default Pagination;
