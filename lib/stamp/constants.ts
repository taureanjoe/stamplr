export const US_STATES = [
  { code: "tx", name: "Texas", template: "texas" as const },
];

export const STAMP_TYPES = [
  { id: "pe", name: "Professional Engineer (PE)" },
  { id: "notary", name: "Notary", comingSoon: true },
] as const;

export const PE_DISCIPLINES = [
  "Civil",
  "Mechanical",
  "Electrical",
  "Structural",
  "Environmental",
  "Chemical",
  "Industrial",
  "Other",
];
