export function formatDate(iso: string, precision: "day" | "month" = "day") {
  const value = iso.length === 7 ? `${iso}-01` : iso;
  const date = new Date(`${value}T00:00:00`);

  if (precision === "month") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function dateTimeValue(iso: string) {
  return iso.length === 7 ? `${iso}-01` : iso;
}

export function toDate(iso: string) {
  return new Date(`${dateTimeValue(iso)}T00:00:00.000Z`);
}

export function toIsoDate(iso: string) {
  return toDate(iso).toISOString();
}
