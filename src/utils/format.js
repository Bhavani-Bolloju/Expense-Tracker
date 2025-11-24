export function formatDate(date) {
  const customFormatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return customFormatter.format(new Date(date));
}

