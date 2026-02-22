/**
 * Nevada PE stamp — badge/logo with 4 editable fields.
 *
 * Logic (no UI/architecture change):
 * - Inline the SVG and expose updateBadge({ name, discipline, date, number }) via renderNevadaStamp(options).
 * - Name, discipline, date: locate the SVG <tspan> elements by id (NV uses tspan1, tspan3, tspan5, tspan7)
 *   and set their text content to the new value.
 * - Number (No. 0000): The SVG has this as a flattened <path id="text8"> (outlined glyph curves), which
 *   cannot be edited as text. At render time we replace it with <text><textPath href="#path10"> so
 *   "No. {number}" follows the circular path at the bottom. startOffset="50%" and text-anchor="middle"
 *   to center it on the arc. Match font (sans-serif, ~21px). Remove <path id="text8">.
 */
import type { StampRenderOptions } from "@/lib/stamp/types";
import { escapeXml, splitNameForTwoLines } from "./placeholder-utils";
import { NV_SVG } from "./nv-svg-data";

/** Locate tspan by id and set its text content (keeps existing <text> structure). */
function setTspanById(svg: string, id: string, value: string): string {
  const re = new RegExp(`(<tspan[^>]*\\bid="${id}"[^>]*>)([^<]*)(</tspan>)`, "s");
  return svg.replace(re, (_, open, _content, close) => open + escapeXml(value) + close);
}

/**
 * Replace the static <path id="text8"> (flattened glyphs) with <text><textPath href="#path10">
 * so "No. {number}" follows the circular path at the bottom. Removes the original path.
 */
function replaceText8WithTextOnPath(svg: string, number: string): string {
  // path10 in NV SVG is the TOP arc (center ~167,27); license must use the BOTTOM arc. Use license-arc (injected bottom semicircle).
  const pathId = svg.match(/\bid="(license-path|licensePath)"/)?.[1] ?? "license-arc";
  if (!svg.includes("xmlns:xlink")) {
    svg = svg.replace(/<svg\s/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ');
  }
  // Bottom arc: left→right, sweep-flag=0 (counter-clockwise) so arc bows downward; radius 122 = just inside inner ring. Center 168,168.
  if (svg.includes('id="defs1"')) {
    svg = svg.replace(/<defs\s+id="defs1"\s*\/>/, `<defs id="defs1"><path id="license-arc" d="M 46,168 A 122,122 0 0 0 290,168"/></defs>`);
  }
  const label = escapeXml(`No. ${number || "00000"}`);
  const textEl = `<text font-family="sans-serif" font-size="21.3333" fill="#000000"><textPath xlink:href="#${pathId}" startOffset="50%" text-anchor="middle">${label}</textPath></text>`;

  const text8Idx = svg.indexOf('id="text8"');
  if (text8Idx === -1) {
    const insertPoint = svg.lastIndexOf("</g>");
    if (insertPoint !== -1) svg = svg.slice(0, insertPoint) + textEl + svg.slice(insertPoint);
  } else {
    const pathStart = svg.lastIndexOf("<path", text8Idx);
    const pathEnd = svg.indexOf("/>", text8Idx);
    if (pathEnd !== -1) {
      const pathEndInclusive = pathEnd + 2;
      const segment = svg.slice(pathStart, pathEndInclusive);
      if (segment.includes('id="text8"') && !segment.includes('id="path10"') && pathStart !== -1) {
        svg = svg.slice(0, pathStart) + textEl + svg.slice(pathEndInclusive);
      }
    }
  }
  return svg;
}

export function renderNevadaStamp(options: StampRenderOptions): string {
  try {
    let svg = String(NV_SVG ?? "").trim();
    if (!svg.startsWith("<svg")) return fallbackNVStamp(options);

    const name = (options.name ?? "").trim().toUpperCase();
    const number = (options.licenseNumber ?? "").trim();
    const date = (options.expirationDate ?? "").trim() || "00/00/00";
    const discipline = (options.discipline ?? "Professional Engineer").trim().toUpperCase();
    const [nameLine1, nameLine2] = splitNameForTwoLines(name || " ");

    svg = svg.replace(/\bwidth="3\.5in"/, 'width="336"').replace(/\bheight="3\.5in"/, 'height="336"');

    // updateBadge: name, discipline, date — set .textContent on the respective tspans (by id)
    svg = setTspanById(svg, "tspan1", nameLine1);
    svg = setTspanById(svg, "tspan3", nameLine2);
    svg = setTspanById(svg, "tspan5", date);
    svg = setTspanById(svg, "tspan7", discipline);

    // number: replace <path id="text8"> with <text><textPath href="#path10"> on circular path at bottom
    svg = replaceText8WithTextOnPath(svg, number);

    if (options.watermarked) {
      svg = svg.replace("</svg>", '<text x="168" y="168" text-anchor="middle" fill="#ccc" font-size="48" font-weight="bold" font-family="sans-serif" opacity="0.5">SAMPLE</text>\n</svg>');
    }
    return svg;
  } catch {
    return fallbackNVStamp(options);
  }
}

function fallbackNVStamp(options: StampRenderOptions): string {
  const name = (options.name ?? "").trim().toUpperCase();
  const license = (options.licenseNumber ?? "").trim();
  const expiration = (options.expirationDate ?? "").trim() || "00/00/00";
  const discipline = (options.discipline ?? "Professional Engineer").trim().toUpperCase();
  const size = 336;
  const cx = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="100%" height="100%" fill="white"/>
  <circle cx="${cx}" cy="${cx}" r="${size * 0.45}" fill="none" stroke="black" stroke-width="2"/>
  <text x="${cx}" y="${cx - 48}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="16" fill="black">NEVADA</text>
  <text x="${cx}" y="${cx - 24}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="18" fill="black">${escapeXml(name)}</text>
  <text x="${cx}" y="${cx}" text-anchor="middle" font-family="sans-serif" font-size="14" fill="black">Exp: ${escapeXml(expiration)}</text>
  <text x="${cx}" y="${cx + 24}" text-anchor="middle" font-family="sans-serif" font-size="12" fill="black">${escapeXml(discipline)}</text>
  <text x="${cx}" y="${cx + 48}" text-anchor="middle" font-family="sans-serif" font-size="14" fill="black">No. ${escapeXml(license || "00000")}</text>
</svg>`;
}
