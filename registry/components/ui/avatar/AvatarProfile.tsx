"use client";
import Image from "next/image";
import { useState } from "react";

interface AvatarProfileProps {
  imageUrl: string;
  imageAlt: string;
  fallbackText: string;
}

const AvatarProfile = ({
  imageUrl,
  imageAlt,
  fallbackText,
}: AvatarProfileProps) => {
  const [ifImageError, setIfImageError] = useState(false);

  return (
    <div className="border border-[var(--color-border)] rounded-[var(--radius-full)] shrink-0 relative overflow-hidden h-14 w-14">
      {!ifImageError ? (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover rounded-[var(--radius-full)]"
          onError={() => setIfImageError(true)}
        />
      ) : (
        <div
          className="
            h-full w-full
            flex items-center justify-center
            bg-[var(--color-subtle)]
            text-[var(--color-fg)]
            text-[var(--text-sm)]
            font-[var(--font-medium)]
          "
        >
          {fallbackText}
        </div>
      )}
    </div>
  );
};

export default AvatarProfile;
