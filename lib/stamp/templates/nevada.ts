/**
 * Nevada PE stamp — compatible with NV-Nevada-Eng.svg.
 * Replaces: tspan1, tspan3 (name), tspan5 (expiration), tspan7 (discipline), path id="text8" (license).
 * Output is a valid SVG fragment (starts with <svg) so preview works like other states.
 */
import type { StampRenderOptions } from "@/lib/stamp/types";
import { escapeXml, splitNameForTwoLines } from "./placeholder-utils";
import { NV_SVG } from "./nv-svg-data";

function setTspanById(svg: string, id: string, value: string): string {
  const re = new RegExp(`(<tspan[^>]*\\bid="${id}"[^>]*>)([^<]*)(</tspan>)`, "s");
  return svg.replace(re, (_, open, _content, close) => open + escapeXml(value) + close);
}

export function renderNevadaStamp(options: StampRenderOptions): string {
  try {
    let svg = String(NV_SVG ?? "").trim();
    if (!svg.startsWith("<svg")) {
      return fallbackNVStamp(options);
    }

    const name = (options.name ?? "").trim().toUpperCase();
    const license = (options.licenseNumber ?? "").trim();
    const expiration = (options.expirationDate ?? "").trim() || "00/00/00";
    const discipline = (options.discipline ?? "Professional Engineer").trim().toUpperCase();
    const [nameLine1, nameLine2] = splitNameForTwoLines(name || " ");

    // Root: use pixel dimensions so preview and export render (viewBox is 0 0 336 336)
    svg = svg.replace(/\bwidth="3\.5in"/, 'width="336"').replace(/\bheight="3\.5in"/, 'height="336"');

    svg = setTspanById(svg, "tspan1", nameLine1);
    svg = setTspanById(svg, "tspan3", nameLine2);
    svg = setTspanById(svg, "tspan5", expiration);
    svg = setTspanById(svg, "tspan7", discipline);

    // Replace only the path that has id="text8" (vectorized "No. 000000")
    const licenseText = escapeXml(`No. ${license || "00000"}`);
    const textEl = `<text x="168" y="310" text-anchor="middle" font-family="sans-serif" font-size="21.3333" fill="#000000">${licenseText}</text>`;
    const text8Idx = svg.indexOf('id="text8"');
    if (text8Idx !== -1) {
      const pathStart = svg.lastIndexOf("<path", text8Idx);
      const pathEnd = svg.indexOf("/>", text8Idx) + 2;
      if (pathStart !== -1 && pathEnd > pathStart) {
        svg = svg.slice(0, pathStart) + textEl + svg.slice(pathEnd);
      }
    }

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
