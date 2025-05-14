
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: "small" | "default" | "large";
}

export function Spinner({ className, size = "default" }: SpinnerProps) {
  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
        size === "small" && "h-4 w-4",
        size === "default" && "h-6 w-6",
        size === "large" && "h-8 w-8",
        className
      )}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
