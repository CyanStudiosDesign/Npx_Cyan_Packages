"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";

interface PasswordProps {
  passwordLength?: number;
}

type Rule = {
  label: string;
  test: (v: string) => boolean;
};

const rules: Rule[] = [
  { label: "Minimum number of characters is 6.", test: (v) => v.length >= 6 },
  { label: "Should contain lowercase.", test: (v) => /[a-z]/.test(v) },
  { label: "Should contain uppercase.", test: (v) => /[A-Z]/.test(v) },
  { label: "Should contain numbers.", test: (v) => /[0-9]/.test(v) },
  {
    label: "Should contain special characters.",
    test: (v) => /[^a-zA-Z0-9]/.test(v),
  },
];

const levelMap: Record<number, string> = {
  0: "Empty",
  1: "Weak",
  2: "Fair",
  3: "Good",
  4: "Strong",
  5: "Very Strong",
};

const Password = ({ passwordLength = 6 }: PasswordProps) => {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passed = rules.map((r) => r.test(value));
  const score = passed.filter(Boolean).length;

  const barColor = (i: number) => {
    if (i >= score) return "bg-[var(--color-subtle)]";
    if (score <= 1) return "bg-[var(--color-danger)]";
    if (score === 2) return "bg-[var(--color-warning)]";
    if (score === 3) return "bg-yellow-400";
    if (score === 4) return "bg-[var(--color-success)]";
    return "bg-[var(--color-success)]";
  };

  return (
    <div className="flex items-center">
      <div className="w-100 space-y-3">
        {/* Input */}
        <div className="relative h-10">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            minLength={passwordLength}
            className="h-full w-full rounded-md border border-[var(--color-border)] bg-[var(--color-canvas)] px-3 pr-10 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] outline-none focus-ring-visible focus:border-[var(--color-border-strong)]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 top-0 h-full w-10 flex items-center justify-center text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] focus-ring-visible"
          >
            {showPassword ? (
              <Eye strokeWidth={1} size={18} />
            ) : (
              <EyeOff strokeWidth={1} size={18} />
            )}
          </button>
        </div>

        {/* Bars + Level */}
        <div className="space-y-1.5">
          <div className="flex gap-1.5">
            {rules.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${barColor(i)}`}
              />
            ))}
          </div>
          <p className="text-sm text-[var(--color-fg-muted)]">
            Level:{" "}
            <span className="font-semibold text-[var(--color-fg)]">
              {levelMap[score]}
            </span>
          </p>
        </div>

        {/* Checklist */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[var(--color-fg)]">
            Your password must contain:
          </p>
          <ul className="space-y-1">
            {rules.map((rule, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                {passed[i] ? (
                  <Check
                    size={14}
                    strokeWidth={2.5}
                    className="text-[var(--color-success)] shrink-0"
                  />
                ) : (
                  <X
                    size={14}
                    strokeWidth={2.5}
                    className="text-[var(--color-fg-subtle)] shrink-0"
                  />
                )}
                <span
                  className={
                    passed[i]
                      ? "text-[var(--color-success)]"
                      : "text-[var(--color-fg-muted)]"
                  }
                >
                  {rule.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Password;
