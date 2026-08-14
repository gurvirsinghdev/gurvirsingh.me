import type { ReactNode } from "react";
import { ViewTransition } from "react";
import { cn } from "@/lib/cn";

export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ViewTransition enter="fade-in" exit="fade-out">
      <div className={cn("w-full", className)}>{children}</div>
    </ViewTransition>
  );
}
