const degreeMap = {
  "b.tech": "Undergraduate",
  "b.sc": "Undergraduate",
  "b.com": "Undergraduate",
  "b.a": "Undergraduate",
  "bba": "Undergraduate",
  "bca": "Undergraduate",
  "undergraduate": "Undergraduate",
  "m.tech": "Postgraduate",
  "m.sc": "Postgraduate",
  "m.com": "Postgraduate",
  "m.a": "Postgraduate",
  "mba": "Postgraduate",
  "mca": "Postgraduate",
  "postgraduate": "Postgraduate",
  "phd": "PhD",
  "ph.d": "PhD",
  "doctorate": "PhD",
  "diploma": "Diploma",
};

export function mapDegreeToLevel(degree) {
  if (!degree) return null;
  const key = degree.toLowerCase().trim();
  return degreeMap[key] ?? "Other";
} 