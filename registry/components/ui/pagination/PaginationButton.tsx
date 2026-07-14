interface PaginationButtonProps {
  page: number;
  isActive?: boolean;
  onClick: () => void;
}

export default function PaginationButton({
  page,
  isActive,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md border border-border ${
        isActive
          ? "bg-primary text-primary-fg"
          : "bg-canvas text-fg"
      }`}
    >
      {page}
    </button>
  );
}