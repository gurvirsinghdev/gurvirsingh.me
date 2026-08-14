export const categories = ["work", "writing"] as const;

export type Category = (typeof categories)[number];

export type Heading = {
  id: string;
  title: string;
};

export type Post = {
  slug: string;
  category: Category;
  title: string;
  description: string;
  published: string;
  datePrecision?: "day" | "month";
  updated?: string;
  minutes: number;
  headings: Heading[];
};

export const posts: Post[] = [
  {
    slug: "choosing-a-domain-name",
    category: "writing",
    title: "How to Choose a Domain Name",
    description:
      "Choose a domain that is easy to spell, say, and remember. Try to keep it clear instead of making it too clever.",
    published: "2026-06-25",
    minutes: 4,
    headings: [
      { id: "tldr", title: "Gist" },
      { id: "start-with-the-job", title: "Start with the job" },
      { id: "make-it-rememberable", title: "Make it rememberable" },
      { id: "check-more-than-availability", title: "Check more than availability" },
    ],
  },
];

const categorySet = new Set<string>(categories);

export function isCategory(value: string): value is Category {
  return categorySet.has(value);
}

export function categoryLabel(category: Category) {
  return category === "work" ? "Case Studies" : "Writing";
}

export function getPostsByCategory(category: Category) {
  return posts
    .filter((post) => post.category === category)
    .sort((a, b) => sortKey(b.published).localeCompare(sortKey(a.published)));
}

function sortKey(published: string) {
  return published.length === 7 ? `${published}-01` : published;
}

export function getPost(category: string, slug: string) {
  if (!isCategory(category)) return undefined;
  return posts.find((post) => post.category === category && post.slug === slug);
}

export function postHref(post: Pick<Post, "category" | "slug">) {
  return `/${post.category}/${post.slug}` as const;
}
