export const formatLabel = (key:string) => {
  const withSpaces = key.replace(/([A-Z])/g, " $1");
  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const safeParseArray = (value: string | null): unknown[] => {
  if (!value || value === "null" || value === "undefined") {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
