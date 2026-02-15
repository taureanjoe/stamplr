/**
 * Massachusetts PE stamp: uses ma-reference.svg.
 * MA requires discipline on the stamp. Name, license, and discipline are editable.
 * Uses DOM parsing (JSDOM) to replace only textContent of elements with IDs:
 * stamp-name, stamp-name-line2, stamp-license, stamp-discipline.
 * SVG structure, layout, paths, fonts, and styling are never modified.
 */
import type { StampRenderOptions } from "@/lib/stamp/types";
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import { join } from "path";
import { escapeXml, splitNameForTwoLines } from "./placeholder-utils";

const TEMPLATE_PATH = join(process.cwd(), "lib", "stamp", "templates", "ma-reference.svg");

/** Technical sans-serif - professional stamp font. Arial as fallback. */
const FONT_FAMILY = "'Technical Sans', 'Technic', Arial, sans-serif";

export function renderMassachusettsStamp(options: StampRenderOptions): string {
  let svgText: string;
  try {
    svgText = readFileSync(TEMPLATE_PATH, "utf-8");
  } catch {
    return fallbackMAStamp(options);
  }

  // Blank stamp when no data; show user data when provided. Default discipline: CIVIL
  const name = (options.name ?? "").trim().toUpperCase();
  const license = (options.licenseNumber ?? "").trim();
  const discipline = (options.discipline ?? "CIVIL").trim().toUpperCase();

  const [firstName, lastName] = splitNameForTwoLines(name || " ");

  try {
    const dom = new JSDOM(svgText, { contentType: "image/svg+xml" });
    const doc = dom.window.document;
    const svgEl = doc.querySelector("svg");
    if (!svgEl) return fallbackMAStamp(options);

    const setText = (id: string, value: string) => {
      const el = doc.getElementById(id);
      if (el) el.textContent = value;
    };

    setText("stamp-name", firstName);
    setText("stamp-name-line2", lastName);
    setText("stamp-discipline", discipline);
    setText("stamp-license", license);

    let result = svgEl.outerHTML;
    if (options.watermarked) {
      const cx = 1170.5;
      const nameY = 1050;
      const nameFontSize = 130;
      result = result.replace(
        "</svg>",
        `<text x="${cx}" y="${nameY}" text-anchor="middle" fill="#ccc" font-size="${nameFontSize}" font-weight="bold" font-family="${FONT_FAMILY}">SAMPLE</text>\n</svg>`
      );
    }
    return result;
  } catch {
    return fallbackMAStamp(options);
  }
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
