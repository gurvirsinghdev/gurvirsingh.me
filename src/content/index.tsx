import type { ComponentType } from "react";
import { DomainNameContent } from "@/content/choosing-a-domain-name";

const contentMap: Record<string, ComponentType> = {
  "choosing-a-domain-name": DomainNameContent,
};

export function PostContent({ slug }: { slug: string }) {
  const Content = contentMap[slug];
  if (!Content) return null;
  return <Content />;
}
