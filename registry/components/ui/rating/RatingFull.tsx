"use client";

import React, { useState } from "react";

interface RatingFullProps {
  totalStars?: number;
  value: number;
  onChange?: (value: number) => void;
  className?: string;
}

export const RatingFull = ({
  totalStars = 5,
  value,
  onChange,
  className,
}: RatingFullProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue ?? value;

  return (
    <div className={className + " flex items-center gap-1"}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const filled = displayValue >= starValue;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(null)}
            className="transition-transform hover:scale-110"
          >
            <Star filled={filled} />
          </button>
        );
      })}
    </div>
  );
};

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={`h-6 w-6 transition-colors ${
      filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
    }`}
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
