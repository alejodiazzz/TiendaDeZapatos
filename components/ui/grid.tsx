import React from "react";
import { cn } from "@/lib/utils";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
}

export function Grid({
  children,
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "gap-6",
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        "grid",
        `grid-cols-${cols.mobile}`,
        `md:grid-cols-${cols.tablet}`,
        `lg:grid-cols-${cols.desktop}`,
        gap,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function GridItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}
