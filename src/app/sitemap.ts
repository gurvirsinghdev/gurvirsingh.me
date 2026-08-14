import type { MetadataRoute } from "next";
import { toDate } from "@/lib/dates";
import { postHref, posts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts.reduce<Date | undefined>((latest, post) => {
    const date = toDate(post.updated ?? post.published);
    if (!latest || date > latest) return date;
    return latest;
  }, undefined);

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latestPost ?? new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(postHref(post)),
      lastModified: toDate(post.updated ?? post.published),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
