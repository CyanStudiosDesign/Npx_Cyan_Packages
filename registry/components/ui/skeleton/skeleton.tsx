import { cn } from "@/lib/utils";
//this is skeleton feature
export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "animate-pulse w-full h-full bg-subtle rounded-md",
        className,
      )}
    />
  );
};
