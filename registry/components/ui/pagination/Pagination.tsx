import PaginationButton from "./PaginationButton";
import PaginationPrevious from "./PaginationPrevious";
import PaginationNext from "./PaginationNext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex gap-2 items-center">
      <PaginationPrevious
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map((page) => (
        <PaginationButton
          key={page}
          page={page}
          isActive={currentPage === page}
          onClick={() => onPageChange(page)}
        />
      ))}

      <PaginationNext
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
}