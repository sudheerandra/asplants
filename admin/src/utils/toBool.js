export const toBool = (v) => {
  if (typeof v === "string") return v.toLowerCase() === "true";
  if (typeof v === "number") return v === 1;
  return Boolean(v);
};