import Link from "next/link";
import { categoryLabel, type Category } from "@/lib/posts";

export function Breadcrumbs({
  category,
  title,
}: {
  category: Category;
  title: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
      <Link
        href="/"
        transitionTypes={["nav-back"]}
        className="transition-colors hover:text-foreground"
      >
        Home
      </Link>
      <span aria-hidden="true">›</span>
      <span>{categoryLabel(category)}</span>
      <span aria-hidden="true">›</span>
      <span>{title}</span>
    </nav>
  );
}
