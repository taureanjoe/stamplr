/**
 * Massachusetts PE stamp: uses ma-reference.svg.
 * MA requires discipline on the stamp. Name, license, and discipline are editable.
 * Prefers in-place replacement of text placeholders to preserve template font/size/position.
 * Font: Technical Sans (or Arial fallback) for professional stamp look.
 */
import type { StampRenderOptions } from "@/lib/stamp/types";
import { readFileSync } from "fs";
import { join } from "path";
import {
  escapeXml,
  replaceNamePlaceholder,
  replaceLicensePlaceholder,
  replaceDisciplinePlaceholder,
} from "./placeholder-utils";

const TEMPLATE_PATH = join(process.cwd(), "lib", "stamp", "templates", "ma-reference.svg");

/** Technical sans-serif - professional stamp font. Arial as fallback. */
const FONT_FAMILY = "'Technical Sans', 'Technic', Arial, sans-serif";

export function renderMassachusettsStamp(options: StampRenderOptions): string {
  let svg: string;
  try {
    svg = readFileSync(TEMPLATE_PATH, "utf-8");
  } catch {
    return fallbackMAStamp(options);
  }

  const name = (options.name || "JOHN M. DOE").toUpperCase();
  const license = options.licenseNumber || "No. PE123456";
  const discipline = (options.discipline || "Professional Engineer").toUpperCase();

  // 1. Try {{PLACEHOLDER}} string replacement
  // Supports: {{First Name}}, {{Discipline}}, {{000000}} and legacy {{NAME}}, {{LICENSE}}, {{DISCIPLINE}}
  const hasLegacyPlaceholders = svg.includes("{{NAME}}") || svg.includes("{{LICENSE}}") || svg.includes("{{DISCIPLINE}}");
  const hasNewPlaceholders = svg.includes("{{First Name}}") || svg.includes("{{Discipline}}") || svg.includes("{{000000}}");

  if (hasLegacyPlaceholders || hasNewPlaceholders) {
    svg = svg
      .replace(/\{\{First Name\}\}/g, escapeXml(name))
      .replace(/\{\{NAME\}\}/g, escapeXml(name))
      .replace(/\{\{Discipline\}\}/g, escapeXml(discipline))
      .replace(/\{\{DISCIPLINE\}\}/g, escapeXml(discipline))
      .replace(/\{\{000000\}\}/g, escapeXml(license))
      .replace(/\{\{LICENSE\}\}/g, escapeXml(license));
  } else {
    // 2. Try in-place replacement of <text> placeholders (preserves font, size, position)
    let nameReplaced = false;
    let licenseReplaced = false;
    let disciplineReplaced = false;

    const nameResult = replaceNamePlaceholder(svg, name);
    svg = nameResult.svg;
    nameReplaced = nameResult.replaced;

    const licenseResult = replaceLicensePlaceholder(svg, license);
    svg = licenseResult.svg;
    licenseReplaced = licenseResult.replaced;

    const disciplineResult = replaceDisciplinePlaceholder(svg, discipline);
    svg = disciplineResult.svg;
    disciplineReplaced = disciplineResult.replaced;

    // 3. If no placeholders found, inject text (fallback)
    if (!nameReplaced || !licenseReplaced || !disciplineReplaced) {
      const cx = 1170.5;
      const nameY = 1050;
      const licenseY = 1250;
      const disciplineY = 1450;
      const nameFontSize = 130;
      const licenseFontSize = 110;
      const disciplineFontSize = 90;

      const parts: string[] = [];
      if (!nameReplaced)
        parts.push(
          `<text x="${cx}" y="${nameY}" text-anchor="middle" font-family="${FONT_FAMILY}" font-weight="bold" font-size="${nameFontSize}" fill="black">${escapeXml(name)}</text>`
        );
      if (!licenseReplaced)
        parts.push(
          `<text x="${cx}" y="${licenseY}" text-anchor="middle" font-family="${FONT_FAMILY}" font-weight="bold" font-size="${licenseFontSize}" fill="black">${escapeXml(license)}</text>`
        );
      if (!disciplineReplaced)
        parts.push(
          `<text x="${cx}" y="${disciplineY}" text-anchor="middle" font-family="${FONT_FAMILY}" font-weight="bold" font-size="${disciplineFontSize}" fill="black">${escapeXml(discipline)}</text>`
        );
      if (parts.length > 0) {
        svg = svg.replace("</svg>", `${parts.join("\n  ")}\n</svg>`);
      }
    }
  }

  if (options.watermarked) {
    const cx = 1170.5;
    const nameY = 1050;
    const nameFontSize = 130;
    svg = svg.replace(
      "</svg>",
      `<text x="${cx}" y="${nameY}" text-anchor="middle" fill="#ccc" font-size="${nameFontSize}" font-weight="bold" font-family="${FONT_FAMILY}">SAMPLE</text>\n</svg>`
    );
  }

  return svg;
}

function fallbackMAStamp(options: StampRenderOptions): string {
  const name = (options.name || "JOHN M. DOE").toUpperCase();
  const license = options.licenseNumber || "No. PE123456";
  const discipline = (options.discipline || "Professional Engineer").toUpperCase();
  const size = options.size ?? 400;
  const cx = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="100%" height="100%" fill="white"/>
  <circle cx="${cx}" cy="${cx}" r="${size * 0.45}" fill="none" stroke="black" stroke-width="2"/>
  <text x="${cx}" y="${cx - 36}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="16" fill="black">MASSACHUSETTS</text>
  <text x="${cx}" y="${cx - 12}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="18" fill="black">${escapeXml(name)}</text>
  <text x="${cx}" y="${cx + 12}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="14" fill="black">${escapeXml(license)}</text>
  <text x="${cx}" y="${cx + 36}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="12" fill="black">${escapeXml(discipline)}</text>
</svg>`;
}
