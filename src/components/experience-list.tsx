import {
  experiences,
  formatExperienceRange,
} from "@/lib/experience";

export function ExperienceList() {
  if (experiences.length === 0) return null;

  return (
    <section>
      <h2 className="text-sm text-muted">Experience</h2>
      <ul className="mt-2 divide-y divide-border border-y border-border">
        {experiences.map((item) => (
          <li key={`${item.company}-${item.start}`} className="py-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[15px] text-foreground">{item.role}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-border underline-offset-4 hover:decoration-muted"
                    >
                      {item.company}
                    </a>
                  ) : (
                    item.company
                  )}
                </p>
              </div>
              <div className="shrink-0 text-right text-sm text-muted">
                <time dateTime={item.start}>
                  {formatExperienceRange(item.start, item.end)}
                </time>
                {item.location ? (
                  <p className="mt-0.5">{item.location}</p>
                ) : null}
              </div>
            </div>

            {item.highlights && item.highlights.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-6 text-muted">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
