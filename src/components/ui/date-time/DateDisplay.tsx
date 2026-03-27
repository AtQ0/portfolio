type DateDisplayProps = {
  timeZone?: string;
  className?: string;
};

export function DateDisplay({
  timeZone = "Europe/London",
  className = "block",
}: DateDisplayProps) {
  const now = new Date();

  const weekday = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    timeZone,
  }).format(now);

  const day = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    timeZone,
  }).format(now);

  const month = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    timeZone,
  }).format(now);

  // valid machine-readable date for <time datetime="">
  const isoDate = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone,
  }).format(now);

  return (
    <time className={className} dateTime={isoDate}>
      {weekday}, {day} {month}
    </time>
  );
}
