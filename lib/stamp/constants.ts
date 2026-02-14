export const US_STATES = [
  { code: "tx", name: "Texas", template: "texas" as const },
  { code: "pa", name: "Pennsylvania", template: "generic" as const },
  { code: "ca", name: "California", template: "generic" as const },
  { code: "ny", name: "New York", template: "generic" as const },
  { code: "fl", name: "Florida", template: "generic" as const },
];

export const STAMP_TYPES = [
  { id: "pe", name: "Professional Engineer (PE)" },
  { id: "notary", name: "Notary", comingSoon: true },
] as const;

export const PE_DISCIPLINES = [
  "Professional Engineer",
  "Civil",
  "Mechanical",
  "Electrical",
  "Structural",
  "Environmental",
  "Chemical",
  "Industrial",
  "Other",
];
