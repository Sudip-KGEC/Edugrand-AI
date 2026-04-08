export const mapDegreeToLevel = (degree) => {
  if (!degree) return null;

  const d = degree.toLowerCase();

  if (
    d.includes("b.tech") ||
    d.includes("bachelor") ||
    d.includes("bsc") ||
    d.includes("bca")
  ) {
    return "Undergraduate";
  }

  if (
    d.includes("m.tech") ||
    d.includes("master") ||
    d.includes("msc") ||
    d.includes("mca")
  ) {
    return "Postgraduate";
  }

  if (d.includes("phd")) {
    return "PhD";
  }

  if (d.includes("diploma")) {
    return "Diploma";
  }

  return "Other";
};