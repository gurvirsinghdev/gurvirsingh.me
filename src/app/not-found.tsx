import { PageShell } from "@/components/page-shell";
import Link from "next/link";

export const metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <PageShell className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-5 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
      <p className="mt-2 text-[15px] leading-6 text-muted">
        That page does not exist. Head back home.
      </p>
      <Link
        href="/"
        transitionTypes={["nav-back"]}
        className="mt-5 w-fit text-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-muted"
      >
        Home
      </Link>
    </PageShell>
  );
}
