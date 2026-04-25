export const detectCategory = (vendor) => {
  // 🔥 FIX: handle empty/undefined vendor
  if (!vendor) return "Others";

  const v = vendor.toLowerCase();

  if (v.includes("uber") || v.includes("ola")) return "Travel";
  if (v.includes("hotel") || v.includes("restaurant")) return "Food";
  if (v.includes("mall") || v.includes("store")) return "Shopping";

  return "Others";
};