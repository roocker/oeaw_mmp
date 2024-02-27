import { usePagination, DOTS, usePaginationProps } from "../usePagination";
import "../styles/pagination.css";

interface PaginationProps extends usePaginationProps {
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalCount,
  pageSize,
  siblingCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  if (currentPage === 0 && paginationRange && paginationRange.length < 2) {
    console.log(
      "currentPage === 0 || paginationRange.length < 2 -> i return null",
    );
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul className={"pagination-container"}>
      {/* Left navigation arrow */}
      <li className="pagination-item" onClick={onPrevious}>
        <div className="arrow left" />
      </li>
      {paginationRange?.map((pageNumber: number | string, i) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={`arrow ${i}`} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            key={pageNumber}
            className="pagination-item"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li className="pagination-item" onClick={onNext}>
        <div className="arrow right" />
      </li>
    </ul>
  );
}
