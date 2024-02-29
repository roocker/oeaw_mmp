import { usePagination, usePaginationProps } from "../usePagination";

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
    <ul className="flex">
      {/* left  arrow */}
      <li className="pagination-item" onClick={onPrevious}>
        <div className="arrow left" />
      </li>

      {paginationRange?.map((pageNumber: string | number, i) => {
        if (typeof pageNumber === "string") {
          return (
            <li key={`arrow ${i}`} className="pagination-item dots ">
              &#8230;
            </li>
          );
        } else {
          return (
            <li
              key={pageNumber}
              className={`${
                pageNumber === currentPage ? "selected" : ""
              } pagination-item`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        }
      })}
      {/*  right arrow */}
      <li className="pagination-item" onClick={onNext}>
        <div className="arrow right" />
      </li>
    </ul>
  );
}
