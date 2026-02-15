import type { StampRenderOptions } from "@/lib/stamp/types";
import { renderTexasStamp } from "@/lib/stamp/templates/texas";
import { renderMassachusettsStamp } from "@/lib/stamp/templates/massachusetts";
import { renderMissouriStamp } from "@/lib/stamp/templates/missouri";
import { renderNewHampshireStamp } from "@/lib/stamp/templates/new-hampshire";
import { renderMichiganStamp } from "@/lib/stamp/templates/michigan";

export type { StampOptions, StampRenderOptions } from "@/lib/stamp/types";
export {
  STATES_WITH_TEMPLATES,
  SEAL_TYPES,
  PE_DISCIPLINES,
  SEAL_TYPE_DISCIPLINES,
  US_STATES,
  STAMP_TYPES,
} from "@/lib/stamp/constants";

export function renderStamp(options: StampRenderOptions): string {
  if (options.template === "texas") {
    return renderTexasStamp(options);
  }
  if (options.template === "massachusetts") {
    return renderMassachusettsStamp(options);
  }
  if (options.template === "missouri") {
    return renderMissouriStamp(options);
  }
  if (options.template === "new-hampshire") {
    return renderNewHampshireStamp(options);
  }
  if (options.template === "michigan") {
    return renderMichiganStamp(options);
  }
  return renderGenericStamp(options);
}

function renderGenericStamp(options: StampRenderOptions): string {
  const name = (options.name || "JOHN M. DOE").toUpperCase();
  const license = options.licenseNumber || "000000";
  const size = options.size ?? 400;
  const cx = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="100%" height="100%" fill="white"/>
  <circle cx="${cx}" cy="${cx}" r="${size * 0.45}" fill="none" stroke="black" stroke-width="2"/>
  <text x="${cx}" y="${cx - 24}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="16" fill="black">${escapeXml(options.stateName)}</text>
  <text x="${cx}" y="${cx}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="18" fill="black">${escapeXml(name)}</text>
  <text x="${cx}" y="${cx + 24}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="14" fill="black">${escapeXml(license)}</text>
  <text x="${cx}" y="${cx + 50}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="12" fill="black">${escapeXml(options.discipline || "PROFESSIONAL ENGINEER")}</text>
</svg>`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
