import React from "react";

interface RatingHalfProps {
  totalStars?: number;
  value: number;
  className?: string;
}

export const RatingHalf = ({
  totalStars = 5,
  value,
  className,
}: RatingHalfProps) => {
  return (
    <div className={className + " flex items-center gap-1"}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        const full = value >= starValue;
        const half = value >= starValue - 0.5 && value < starValue;

        return (
          <div key={index} className="relative">
            <Star filled={false} />

            {(full || half) && (
              <div
                className="absolute inset-0 overflow-hidden text-yellow-400"
                style={{ width: full ? "100%" : "50%" }}
              >
                <Star filled />
              </div>
            )}
          </div>
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
