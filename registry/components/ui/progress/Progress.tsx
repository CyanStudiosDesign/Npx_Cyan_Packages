import { cn } from "@/lib/utils";
interface Props {
  value: number;

  className?: string;
}
export const Progress = ({ value, className }: Props) => {
  return (
    <>
      <div
        className={cn(
          "h-1.5 w-60 bg-canvas overflow-hidden border rounded-full border-border",
          className
        )}
      >
        <div
          className="h-full w-full rounded-full bg-inverse transition-all duration-300"
          style={{
            transform: `translateX(-${100 - value}%)`,
          }}
        ></div>
      </div>
    </>
  );
};
