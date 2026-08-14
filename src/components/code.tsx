import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const commandPattern =
  /^(pnpm|npm|npx|yarn|bun|vercel|git|cd|node|next|ssh)\b/;

function highlightLine(line: string) {
  const trimmed = line.trimStart();
  if (trimmed.startsWith("#") || trimmed.startsWith("//")) {
    return <span className="text-muted">{line}</span>;
  }

  const indent = line.match(/^\s*/)?.[0] ?? "";
  const rest = line.slice(indent.length);
  const match = rest.match(commandPattern);

  if (!match) {
    return line;
  }

  return (
    <>
      {indent}
      <span className="text-accent">{match[1]}</span>
      {rest.slice(match[1].length)}
    </>
  );
}

export function InlineCode({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <code
      className={cn(
        "rounded-md bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-foreground",
        className,
      )}
    >
      {children}
    </code>
  );
}

export function CodeBlock({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const lines = children.replace(/^\n|\n$/g, "").split("\n");

  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg border border-border bg-background px-3 py-3 font-mono text-[13px] leading-5 text-foreground",
        className,
      )}
    >
      <code>
        {lines.map((line, index) => (
          <span key={index} className="block min-h-[1.5em]">
            {highlightLine(line)}
          </span>
        ))}
      </code>
    </pre>
  );
}
