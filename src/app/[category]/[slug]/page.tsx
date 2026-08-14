import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "@/components/article";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { PostContent } from "@/content";
import { toIsoDate } from "@/lib/dates";
import { getPost, postHref, posts } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

export async function generateStaticParams() {
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPost(category, slug);

  if (!post) {
    return { title: "Not found", robots: { index: false, follow: true } };
  }

  const url = absoluteUrl(postHref(post));

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: toIsoDate(post.published),
      modifiedTime: toIsoDate(post.updated ?? post.published),
      authors: [site.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = getPost(category, slug);

  if (!post) {
    notFound();
  }

  return (
    <PageShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: toIsoDate(post.published),
          dateModified: toIsoDate(post.updated ?? post.published),
          url: absoluteUrl(postHref(post)),
          mainEntityOfPage: absoluteUrl(postHref(post)),
          author: {
            "@type": "Person",
            name: site.name,
            url: site.url,
          },
          publisher: {
            "@type": "Person",
            name: site.name,
            url: site.url,
          },
        }}
      />
      <Article post={post}>
        <PostContent slug={post.slug} />
      </Article>
    </PageShell>
  );
}
