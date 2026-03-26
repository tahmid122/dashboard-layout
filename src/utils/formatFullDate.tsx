export const formatFullDate = (dateInput?: string | Date): string => {
  const date = dateInput ? new Date(dateInput) : new Date();

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
