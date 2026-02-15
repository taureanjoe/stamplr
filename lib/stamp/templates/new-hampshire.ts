/**
 * New Hampshire PE stamp: uses embedded SVG template.
 * NH does NOT require discipline on the stamp.
 * Name is three lines (first / middle / last), license number is editable.
 * Font: Overpass Mono, size 75, letter-spacing 0em (matching Figma export).
 * Uses regex-based ID replacement to set textContent of <tspan> elements with IDs:
 * stamp-name, stamp-name-middle, stamp-name-line2, stamp-license.
 * SVG structure, layout, paths, fonts, and styling are never modified.
 */
import type { StampRenderOptions } from "@/lib/stamp/types";
import { escapeXml, splitNameForThreeLines } from "./placeholder-utils";
import { NH_SVG } from "./nh-svg-data";

/**
 * Replace the text content of a <tspan> identified by its id attribute.
 * Matches: <tspan id="ID" ...>CONTENT</tspan>
 */
function setTspanById(svg: string, id: string, value: string): string {
  const pattern = new RegExp(
    `(<tspan\\b[^>]*\\bid="${id}"[^>]*>)(.*?)(</tspan>)`,
    "s"
  );
  const match = svg.match(pattern);
  if (match) {
    return svg.replace(pattern, `$1${escapeXml(value)}$3`);
  }
  return svg;
}

export function renderNewHampshireStamp(options: StampRenderOptions): string {
  let svg = NH_SVG;
  if (!svg) return fallbackNHStamp(options);

  const name = (options.name ?? "").trim().toUpperCase();
  const license = (options.licenseNumber ?? "").trim();

  const [firstName, middleName, lastName] = splitNameForThreeLines(name || " ");

  svg = setTspanById(svg, "stamp-name", firstName);
  svg = setTspanById(svg, "stamp-name-middle", middleName);
  svg = setTspanById(svg, "stamp-name-line2", lastName);
  svg = setTspanById(svg, "stamp-license", license ? `NO.${license}` : "");

  if (options.watermarked) {
    svg = svg.replace(
      "</svg>",
      `<text x="480" y="480" text-anchor="middle" fill="#ccc" font-size="96" font-weight="bold" font-family="Overpass Mono, monospace" opacity="0.5">SAMPLE</text>\n</svg>`
    );
  }

  return svg;
}

function fallbackNHStamp(options: StampRenderOptions): string {
  const name = (options.name ?? "").trim().toUpperCase();
  const license = (options.licenseNumber ?? "").trim();
  const size = options.size ?? 400;
  const cx = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="100%" height="100%" fill="white"/>
  <circle cx="${cx}" cy="${cx}" r="${size * 0.45}" fill="none" stroke="black" stroke-width="2"/>
  <text x="${cx}" y="${cx - 36}" text-anchor="middle" font-family="Overpass Mono, monospace" font-weight="bold" font-size="16" fill="black">NEW HAMPSHIRE</text>
  <text x="${cx}" y="${cx - 12}" text-anchor="middle" font-family="Overpass Mono, monospace" font-weight="bold" font-size="18" fill="black">${escapeXml(name)}</text>
  <text x="${cx}" y="${cx + 12}" text-anchor="middle" font-family="Overpass Mono, monospace" font-weight="bold" font-size="14" fill="black">${escapeXml(license)}</text>
  <text x="${cx}" y="${cx + 36}" text-anchor="middle" font-family="Overpass Mono, monospace" font-weight="bold" font-size="12" fill="black">PROFESSIONAL ENGINEER</text>
</svg>`;
}
