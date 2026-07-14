"use client";
import { useState, useRef, useEffect } from "react";

type ContainerProps = {
  length?: number;
};

const Container = ({ length = 4 }: ContainerProps) => {
  const refArr = useRef<(HTMLInputElement | null)[]>([]);
  const [inputArray, setInputArray] = useState(new Array(length).fill(""));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value;
    if (!/^[0-9]*$/.test(val)) return;
    let newInputArray = [...inputArray];
    newInputArray[index] = val;
    setInputArray(newInputArray);
    if (val && index < length - 1) {
      refArr.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !inputArray[index] && index > 0) {
      refArr.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-[var(--color-canvas)]">
      <h1
        className="
          font-semibold
          text-2xl
          leading-[var(--leading-tight)]
          tracking-tight
          mb-2
          text-[var(--color-fg)]
        "
      >
        Enter Otp
      </h1>
      <div>
        {inputArray.map((value, index) => (
          <input
            type="text"
            ref={(input) => {
              refArr.current[index] = input;
            }}
            key={index}
            className="
              border border-[var(--color-border)]
              h-12 w-12
              rounded-[var(--radius-md)]
              text-xl
              p-[var(--spacing-1)]
              font-[var(--font-medium)]
              m-[var(--spacing-3)]
              text-center
              text-[var(--color-fg-muted)]
              bg-[var(--color-surface)]
              shadow-[var(--shadow-sm)]
              focus:border-[var(--color-border-strong)]
              focus:outline-none
              focus-ring-visible
              transition-all duration-[var(--duration-fast)]
            "
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
          />
        ))}
      </div>
    </div>
  );
};

export default Container;
