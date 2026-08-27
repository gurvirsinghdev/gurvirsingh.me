export type Experience = {
  company: string;
  role: string;
  start: string;
  end?: string;
  href?: string;
  location?: string;
  highlights?: string[];
};

export const experiences: Experience[] = [
  {
    company: "MegaWrench",
    role: "Founder & Full Stack Engineer",
    start: "2026-08",
    href: "https://megawrench.com",
    location: "Waitlist open",
    highlights: [
      "Launching as a free beta with a public waitlist.",
    ],
  },
  {
    company: "Freelance",
    role: "Full-Stack Developer",
    start: "2022",
    end: "2024",
    location: "Remote",
    highlights: [
      "Partnered with businesses to design and build custom software solutions tailored to their operational needs.",
      "Managed projects end-to-end, from requirements and solution design to deployment and ongoing support.",
      "Developed custom web applications, internal dashboards, reporting systems, and workflow automation tools.",
      "Focused on delivering practical, maintainable software aligned with business objectives.",
    ],
  },
];

export function formatExperienceRange(start: string, end?: string) {
  const startLabel = formatExperienceDate(start);
  if (!end) return `${startLabel} – Present`;
  return `${startLabel} – ${formatExperienceDate(end)}`;
}

function formatExperienceDate(iso: string) {
  if (iso.length === 4) return iso;

  const value = iso.length === 7 ? `${iso}-01` : iso;
  const date = new Date(`${value}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}
