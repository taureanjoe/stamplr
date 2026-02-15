/**
 * Massachusetts PE stamp: uses embedded SVG template.
 * MA requires discipline on the stamp. Name, license, and discipline are editable.
 * Uses regex-based ID replacement to set textContent of elements with IDs:
 * stamp-name, stamp-name-line2, stamp-license, stamp-discipline.
 * SVG structure, layout, paths, fonts, and styling are never modified.
 */
import type { StampRenderOptions } from "@/lib/stamp/types";
import { escapeXml, splitNameForTwoLines } from "./placeholder-utils";
import { MA_SVG } from "./ma-svg-data";

/** Technical sans-serif - professional stamp font. Arial as fallback. */
const FONT_FAMILY = "'Technical Sans', 'Technic', Arial, sans-serif";

/**
 * Replace the text content of an SVG element identified by its id attribute.
 * Handles both self-closing tags and tags with existing content.
 */
function setTextById(svg: string, id: string, value: string): string {
  // Match <text ... id="ID" ...>...</text> or <text ... id="ID" .../>
  const pattern = new RegExp(
    `(<text\\b[^>]*\\bid="${id}"[^>]*>)(.*?)(</text>)`,
    "s"
  );
  const match = svg.match(pattern);
  if (match) {
    return svg.replace(pattern, `$1${escapeXml(value)}$3`);
  }
  // Try self-closing: <text ... id="ID" ... />
  const selfClosing = new RegExp(
    `(<text\\b[^>]*\\bid="${id}"[^/]*)/>`
  );
  const selfMatch = svg.match(selfClosing);
  if (selfMatch) {
    return svg.replace(selfClosing, `$1>${escapeXml(value)}</text>`);
  }
  return svg;
}

export function renderMassachusettsStamp(options: StampRenderOptions): string {
  let svg = MA_SVG;
  if (!svg) return fallbackMAStamp(options);

  // Blank stamp when no data; show user data when provided. Default discipline: CIVIL
  const name = (options.name ?? "").trim().toUpperCase();
  const license = (options.licenseNumber ?? "").trim();
  const discipline = (options.discipline ?? "CIVIL").trim().toUpperCase();

  const [firstName, lastName] = splitNameForTwoLines(name || " ");

  svg = setTextById(svg, "stamp-name", firstName);
  svg = setTextById(svg, "stamp-name-line2", lastName);
  svg = setTextById(svg, "stamp-discipline", discipline);
  svg = setTextById(svg, "stamp-license", license);

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
  const name = (options.name ?? "").trim().toUpperCase();
  const license = (options.licenseNumber ?? "").trim();
  const discipline = (options.discipline ?? "CIVIL").trim().toUpperCase();
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
