import { createOgImage, ogSize } from "@/lib/og";
import { getPost } from "@/lib/posts";
import { site } from "@/lib/site";

export const alt = site.name;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = getPost(category, slug);

  return createOgImage({
    title: post?.title ?? site.name,
    subtitle: site.name,
  });
}
