import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer
      className="mx-auto flex w-full max-w-2xl items-center justify-end gap-4 border-t border-border px-5 py-4"
      style={{ viewTransitionName: "site-footer" }}
    >
      <a
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        GitHub
      </a>
      <a
        href={site.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        LinkedIn
      </a>
    </footer>
  );
}
