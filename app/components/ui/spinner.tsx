import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // If you're using shadcn's `cn` helper

export function Spinner({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <Loader2 className={cn("animate-spin text-gray-500", sizeMap[size], className)} />
  );
}
