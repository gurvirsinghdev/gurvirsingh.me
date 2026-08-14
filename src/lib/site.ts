export const site = {
  name: "Gurvir Singh",
  role: "Computing Science student",
  description:
    "Computing Science student and full-stack developer. I build internal tools, software for clients, and sometimes experiment with things just to see how they work.",
  github: "https://github.com/gurvirsinghdev",
  linkedin: "https://linkedin.com/in/gurvirsinghdev",
  url: "https://gurvirsingh.me",
};

export function absoluteUrl(path = "/") {
  if (path === "/") return site.url;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
