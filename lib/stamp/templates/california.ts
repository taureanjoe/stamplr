/**
 * California PE stamp renderer.
 *
 * Same pattern as Alabama/Nevada: inject <path> arcs into defs and replace name/discipline
 * with <text><textPath xlink:href="#..."> so text-on-path renders in inline SVG.
 *
 * - License: <tspan id="tspan17"> — update number only.
 * - Name: replace <text id="text19"> with new <text><textPath href="#ca-name-arc">.
 * - Discipline: replace <text id="text20"> with new <text><textPath href="#ca-discipline-arc">.
 */
import type { StampRenderOptions } from "@/lib/stamp/types";
import { escapeXml } from "./placeholder-utils";
import { CA_SVG } from "./ca-svg-data";

const NAME_ARC_ID = "ca-name-arc";
const DISC_ARC_ID = "ca-discipline-arc";
// Top arc (name): radius 102, bows upward; y=174 brings name slightly down. Bottom arc (discipline): radius 119, bows downward.
const NAME_ARC_D = "M 66,174 A 102,102 0 0 1 270,174";
const DISC_ARC_D = "M 49,168 A 119,119 0 0 0 287,168";

function updateLicenseNumber(svg: string, number: string): string {
  const re = /(<tspan[^>]*\bid="tspan17"[^>]*>)([^<]*)(<\/tspan>)/s;
  return svg.replace(re, (_, open, _content, close) => open + escapeXml(number || "00000") + close);
}

/** Inject path arcs into defs and replace name/discipline text with textPath on those paths (like Alabama). */
function injectArcsAndReplaceNameAndDiscipline(svg: string, name: string, discipline: string): string {
  if (!svg.includes("xmlns:xlink")) {
    svg = svg.replace(/<svg\s/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ');
  }
  if (svg.includes('id="defs1"')) {
    svg = svg.replace(
      /<defs\s+id="defs1"\s*\/>/,
      `<defs id="defs1"><path id="${NAME_ARC_ID}" d="${NAME_ARC_D}"/><path id="${DISC_ARC_ID}" d="${DISC_ARC_D}"/></defs>`
    );
  }

  const nameEl =
    `<text font-family="Geneva, sans-serif" font-size="24" fill="#000000">` +
    `<textPath xlink:href="#${NAME_ARC_ID}" startOffset="50%" text-anchor="middle">${escapeXml(name)}</textPath></text>`;
  const discEl =
    `<text font-family="Geneva, sans-serif" font-size="24" fill="#000000">` +
    `<textPath xlink:href="#${DISC_ARC_ID}" startOffset="50%" text-anchor="middle">${escapeXml(discipline)}</textPath></text>`;

  // Replace <text id="text19">...</text> (name block)
  const text19Re = /<text[^>]*\bid="text19"[^>]*>[\s\S]*?<\/textPath><\/text>/;
  if (text19Re.test(svg)) svg = svg.replace(text19Re, nameEl);

  // Replace <text id="text20">...</text> (discipline block)
  const text20Re = /<text[^>]*\bid="text20"[^>]*>[\s\S]*?<\/textPath><\/text>/;
  if (text20Re.test(svg)) svg = svg.replace(text20Re, discEl);

  return svg;
}

export function renderCaliforniaStamp(options: StampRenderOptions): string {
  try {
    let svg = String(CA_SVG ?? "").trim();
    if (!svg.startsWith("<svg")) return fallbackCAStamp(options);

    svg = svg
      .replace(/\bwidth="3\.5in"/, 'width="336"')
      .replace(/\bheight="3\.5in"/, 'height="336"');

    const name = (options.name ?? "").trim().toUpperCase() || "JOHN M DOE";
    const number = (options.licenseNumber ?? "").trim();
    const discipline = (options.discipline ?? "Civil").trim().toUpperCase();

    svg = updateLicenseNumber(svg, number);
    svg = injectArcsAndReplaceNameAndDiscipline(svg, name, discipline);

    if (options.watermarked) {
      svg = svg.replace(
        "</svg>",
        '<text x="168" y="168" text-anchor="middle" fill="#ccc" font-size="48" font-weight="bold" font-family="sans-serif" opacity="0.5">SAMPLE</text>\n</svg>'
      );
    }
    return svg;
  } catch {
    return fallbackCAStamp(options);
  }
}

function fallbackCAStamp(options: StampRenderOptions): string {
  const name = (options.name ?? "").trim().toUpperCase() || "JOHN M DOE";
  const license = (options.licenseNumber ?? "").trim();
  const discipline = (options.discipline ?? "Civil").trim().toUpperCase();
  const size = 336;
  const cx = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="100%" height="100%" fill="white"/>
  <circle cx="${cx}" cy="${cx}" r="${size * 0.45}" fill="none" stroke="black" stroke-width="2"/>
  <circle cx="${cx}" cy="${cx}" r="${size * 0.32}" fill="none" stroke="black" stroke-width="1"/>
  <text x="${cx}" y="${cx - 48}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="16" fill="black">${escapeXml(name)}</text>
  <text x="${cx}" y="${cx + 10}" text-anchor="middle" font-family="sans-serif" font-size="18" fill="black">C ${escapeXml(license || "00000")}</text>
  <text x="${cx}" y="${cx + 56}" text-anchor="middle" font-family="sans-serif" font-size="16" fill="black">${escapeXml(discipline)}</text>
</svg>`;
}
