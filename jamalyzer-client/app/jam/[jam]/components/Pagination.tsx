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
    <div className="pagination">
      <button
        onClick={() => {
          paginate(clamp(currentPage - 10, 1, maxPages));
        }}>
        {"<<"}
      </button>
      <button
        onClick={() => {
          paginate(clamp(currentPage - 1, 1, maxPages));
        }}>
        {"<"}
      </button>
      <p className={"page-number"}>
        {currentPage} / {maxPages}
      </p>
      <button
        onClick={() => {
          paginate(clamp(currentPage + 1, 1, maxPages));
        }}>
        {">"}
      </button>
      <button
        onClick={() => {
          paginate(clamp(currentPage + 10, 1, maxPages));
        }}>
        {">>"}
      </button>
    </div>
  );
}

function clamp(number: number, min: number, max: number): number {
  return Math.max(min, Math.min(number, max));
}

export default Pagination;
