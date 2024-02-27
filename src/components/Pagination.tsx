interface PaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: function;
  siblingCount: number;
}

export default function Pagination({
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  siblingCount,
}: PaginationProps) {
  return <ul></ul>;
}
