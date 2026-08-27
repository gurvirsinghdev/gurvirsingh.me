import { ExperienceList } from "@/components/experience-list";
import { PageShell } from "@/components/page-shell";
import { PostList } from "@/components/post-list";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <PageShell className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 pb-6 pt-10 sm:pt-12">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {site.name}
        </h1>
        <p className="mt-1 text-base text-muted">{site.role}</p>
        <p className="mt-4 max-w-xl text-[15px] leading-6 text-foreground/90">
          {site.description}
        </p>
      </header>

      <div className="mt-10 flex flex-col gap-8">
        <ExperienceList />
        <PostList category="writing" />
      </div>

      <section className="mt-10">
        <h2 className="text-sm text-muted">Contact</h2>
        <div className="mt-2 border-t border-border pt-3">
          <p className="text-[15px] leading-6 text-foreground/90">
            Most of the projects I have worked on started with a conversation.
            If you are thinking about a new product, an internal tool, or a
            custom software project, feel free to reach out to me on{" "}
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border underline-offset-4 hover:decoration-muted"
            >
              LinkedIn
            </a>{" "}
            or{" "}
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border underline-offset-4 hover:decoration-muted"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
