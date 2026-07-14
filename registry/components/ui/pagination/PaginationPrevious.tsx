interface PaginationPreviousProps {
  disabled: boolean;
  onClick: () => void;
}

export default function PaginationPrevious({
  disabled,
  onClick,
}: PaginationPreviousProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="px-3 py-2 rounded-md border border-border bg-canvas text-fg hover:bg-subtle disabled:opacity-50"
    >
      Prev
    </button>
  );
}