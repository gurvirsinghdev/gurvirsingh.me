import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TableOfContents } from "@/components/table-of-contents";
import { formatDate } from "@/lib/dates";
import type { Post } from "@/lib/posts";

export function Article({
  post,
  children,
}: {
  post: Post;
  children: ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full max-w-2xl px-5 pb-6 pt-10">
      <article>
        <Breadcrumbs category={post.category} title={post.title} />
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-muted">
          Published{" "}
          <time dateTime={post.published}>
            {formatDate(post.published, post.datePrecision)}
          </time>
          {post.updated ? (
            <>
              {" "}
              • Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
            </>
          ) : null}
          {` • ${post.minutes} ${post.minutes === 1 ? "minute" : "minutes"} read`}
        </p>
        <div className="mt-7 space-y-3.5 text-[15px] leading-6 text-foreground/90 [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 hover:[&_a]:decoration-muted [&_h2]:scroll-mt-20 [&_h2]:pt-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_li]:pl-1 [&_p]:text-pretty [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          {children}
        </div>
      </article>
      <aside className="absolute top-24 left-[calc(100%+1.25rem)] hidden w-44 xl:block">
        <TableOfContents headings={post.headings} />
      </aside>
    </div>
  );
}
