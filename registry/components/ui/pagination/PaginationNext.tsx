interface PaginationNextProps {
  disabled: boolean;
  onClick: () => void;
}

export default function PaginationNext({
  disabled,
  onClick,
}: PaginationNextProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="px-3 py-2 rounded-md border border-border bg-canvas text-fg disabled:opacity-50"
    >
      Next
    </button>
  );
}