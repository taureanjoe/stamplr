/**
 * Stamp configuration - scalable structure for states, seal types, and disciplines.
 *
 * STATES_WITH_TEMPLATES: Only states that have proper SVG templates.
 * Add new states here when templates are ready.
 *
 * requiresDiscipline: true = state requires discipline text on the stamp (e.g. MA).
 */

export interface StateConfig {
  code: string;
  name: string;
  template: string;
  stampType: "pe" | "notary";
  /** If true, discipline is shown on the stamp and user must select it */
  requiresDiscipline: boolean;
  /** If true, expiration date field is shown and used on the stamp (e.g. Nevada) */
  requiresExpiration?: boolean;
}

/** States that have proper templates - only these appear in the dropdown */
export const STATES_WITH_TEMPLATES: StateConfig[] = [
  {
    code: "tx",
    name: "Texas",
    template: "texas",
    stampType: "pe",
    requiresDiscipline: false,
  },
  {
    code: "ma",
    name: "Massachusetts",
    template: "massachusetts",
    stampType: "pe",
    requiresDiscipline: true,
  },
  {
    code: "mo",
    name: "Missouri",
    template: "missouri",
    stampType: "pe",
    requiresDiscipline: false,
  },
  {
    code: "nh",
    name: "New Hampshire",
    template: "new-hampshire",
    stampType: "pe",
    requiresDiscipline: false,
  },
  {
    code: "mi",
    name: "Michigan",
    template: "michigan",
    stampType: "pe",
    requiresDiscipline: false,
  },
  {
    code: "nv",
    name: "Nevada",
    template: "nevada",
    stampType: "pe",
    requiresDiscipline: true,
    requiresExpiration: true,
  },
];

/**
 * Seal Type = credential type (Professional Engineer, Notary, etc.)
 * This is the first dropdown - "What kind of stamp?"
 */
export const SEAL_TYPES = [
  { id: "pe", name: "Professional Engineer", default: true, comingSoon: false },
  { id: "notary", name: "Notary", comingSoon: true },
] as const;

/**
 * Disciplines per seal type. PE has engineering disciplines.
 * Add more when Notary etc. are supported.
 */
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

/** Map seal type id to its disciplines */
export const SEAL_TYPE_DISCIPLINES: Record<string, readonly string[]> = {
  pe: PE_DISCIPLINES,
};

/** @deprecated Use STATES_WITH_TEMPLATES */
export const US_STATES = STATES_WITH_TEMPLATES;

/** @deprecated Use SEAL_TYPES */
export const STAMP_TYPES = SEAL_TYPES;
