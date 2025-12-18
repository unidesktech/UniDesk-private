export const formatLabel = (key:string) => {
  const withSpaces = key.replace(/([A-Z])/g, " $1");
  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};