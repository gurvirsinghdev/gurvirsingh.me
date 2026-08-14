import Link from "next/link";
import { dateTimeValue, formatDate } from "@/lib/dates";
import { categoryLabel, getPostsByCategory, postHref, type Category } from "@/lib/posts";

export function PostList({ category }: { category: Category }) {
  const items = getPostsByCategory(category);

  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="text-sm text-muted">
        {categoryLabel(category)} ({items.length})
      </h2>
      <ul className="mt-2 divide-y divide-border border-y border-border">
        {items.map((post) => (
          <li key={post.slug}>
            <Link
              href={postHref(post)}
              transitionTypes={["nav-forward"]}
              className="group flex items-baseline justify-between gap-4 py-2"
            >
              <span className="text-[15px] text-foreground transition-colors group-hover:text-muted">
                {post.title}
              </span>
              <time
                dateTime={dateTimeValue(post.published)}
                className="shrink-0 text-sm text-muted"
              >
                {formatDate(post.published, post.datePrecision)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
