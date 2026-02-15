/**
 * Missouri PE stamp: uses embedded SVG template.
 * MO does NOT require discipline on the stamp. Name and license number are editable.
 * Uses regex-based ID replacement to set textContent of elements with IDs:
 * stamp-name, stamp-name-line2, stamp-license-label, stamp-license.
 * SVG structure, layout, paths, fonts, and styling are never modified.
 */
import type { StampRenderOptions } from "@/lib/stamp/types";
import { escapeXml, splitNameForTwoLines } from "./placeholder-utils";
import { MO_SVG } from "./mo-svg-data";

/**
 * Replace the text content inside a <tspan> within a <text> element identified by its id.
 * The MO template uses: <text id="ID" ...><tspan ...>CONTENT</tspan></text>
 */
function setTspanTextById(svg: string, id: string, value: string): string {
  // Match <text ... id="ID" ...><tspan ...>...</tspan></text>
  const pattern = new RegExp(
    `(<text\\b[^>]*\\bid="${id}"[^>]*>\\s*<tspan\\b[^>]*>)(.*?)(</tspan>)`,
    "s"
  );
  const match = svg.match(pattern);
  if (match) {
    return svg.replace(pattern, `$1${escapeXml(value)}$3`);
  }
  return svg;
}

export function renderMissouriStamp(options: StampRenderOptions): string {
  let svg = MO_SVG;
  if (!svg) return fallbackMOStamp(options);

  const name = (options.name ?? "").trim().toUpperCase();
  const license = (options.licenseNumber ?? "").trim();

  const [firstName, lastName] = splitNameForTwoLines(name || " ");

  svg = setTspanTextById(svg, "stamp-name", firstName);
  svg = setTspanTextById(svg, "stamp-name-line2", lastName);
  svg = setTspanTextById(svg, "stamp-license-label", license ? "No." : "");
  svg = setTspanTextById(svg, "stamp-license", license);

  if (options.watermarked) {
    svg = svg.replace(
      "</svg>",
      `<text x="538.5" y="538" text-anchor="middle" fill="#ccc" font-size="96" font-weight="bold" font-family="Gilda Display, serif">SAMPLE</text>\n</svg>`
    );
  }

  return svg;
}

function fallbackMOStamp(options: StampRenderOptions): string {
  const name = (options.name ?? "").trim().toUpperCase();
  const license = (options.licenseNumber ?? "").trim();
  const size = options.size ?? 400;
  const cx = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="100%" height="100%" fill="white"/>
  <circle cx="${cx}" cy="${cx}" r="${size * 0.45}" fill="none" stroke="black" stroke-width="2"/>
  <text x="${cx}" y="${cx - 36}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="16" fill="black">MISSOURI</text>
  <text x="${cx}" y="${cx - 12}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="18" fill="black">${escapeXml(name)}</text>
  <text x="${cx}" y="${cx + 12}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="14" fill="black">${escapeXml(license)}</text>
  <text x="${cx}" y="${cx + 36}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="12" fill="black">PROFESSIONAL ENGINEER</text>
</svg>`;
}
