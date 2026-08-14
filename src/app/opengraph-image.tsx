import { createOgImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return createOgImage({
    title: site.name,
    subtitle: site.role,
  });
}
