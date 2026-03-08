/**
 * Arkansas PE stamp renderer.
 *
 * Editable fields:
 * - Name: on bottom arc via <textPath href="#path2-bottom"> (path2 is full circle, kept invisible).
 * - License: <tspan id="tspan1"> "No. 00000" → update content.
 *
 * path2-bottom: bottom arc only (sweep-flag=0) so text reads left-to-right.
 */
import type { StampRenderOptions } from "@/lib/stamp/types";
import { escapeXml } from "./placeholder-utils";
import { AR_SVG } from "./ar-svg-data";

const PATH2_BOTTOM_ID = "path2-bottom";
// Arc position: slightly above ring (y=182); was 188, moved up a bit
const PATH2_BOTTOM_D =
  "M 32.906467,182 A 135,135 0 0 0 303.093533,182";

function updateLicenseNumber(svg: string, number: string): string {
  const re = /(<tspan[^>]*\bid="tspan1"[^>]*>)([^<]*?)(<\/tspan>)/;
  const label = `No. ${escapeXml(number || "00000")}`;
  return svg.replace(re, (_, open, _content, close) => open + label + close);
}

function injectNameOnBottomArc(svg: string, name: string): string {
  if (!svg.includes("xmlns:xlink")) {
    svg = svg.replace(/<svg\s/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ');
  }

  const pathInDefs = `<path id="${PATH2_BOTTOM_ID}" d="${PATH2_BOTTOM_D}" fill="none" stroke="none"/>`;
  if (svg.includes('id="defs1"')) {
    svg = svg.replace(
      /<defs\s+id="defs1"\s*\/>/,
      `<defs id="defs1">${pathInDefs}</defs>`
    );
  }

  const displayName = escapeXml((name || "JOHN M. DOE").toUpperCase());
  const textEl =
    `<text font-family="Geneva" font-size="21" fill="#000000">` +
    `<textPath xlink:href="#${PATH2_BOTTOM_ID}" startOffset="50%" text-anchor="middle">${displayName}</textPath></text>`;

  const path2End = svg.indexOf('id="path2"');
  if (path2End !== -1) {
    const close = svg.indexOf("/>", path2End);
    if (close !== -1) {
      const insertAt = close + 2;
      svg = svg.slice(0, insertAt) + textEl + svg.slice(insertAt);
    }
  }
  return svg;
}

export function renderArkansasStamp(options: StampRenderOptions): string {
  try {
    let svg = String(AR_SVG ?? "").trim();
    if (!svg.startsWith("<svg")) return fallbackARStamp(options);

    svg = svg
      .replace(/\bwidth="3\.5in"/, 'width="336"')
      .replace(/\bheight="3\.5in"/, 'height="336"');

    const name = (options.name ?? "").trim().toUpperCase() || "JOHN M. DOE";
    const number = (options.licenseNumber ?? "").trim();

    svg = updateLicenseNumber(svg, number);
    svg = injectNameOnBottomArc(svg, name);

    if (options.watermarked) {
      svg = svg.replace(
        "</svg>",
        '<text x="168" y="168" text-anchor="middle" fill="#ccc" font-size="48" font-weight="bold" font-family="sans-serif" opacity="0.5">SAMPLE</text>\n</svg>'
      );
    }
    return svg;
  } catch {
    return fallbackARStamp(options);
  }
}

function fallbackARStamp(options: StampRenderOptions): string {
  const name = (options.name ?? "").trim().toUpperCase() || "JOHN M. DOE";
  const license = (options.licenseNumber ?? "").trim();
  const size = 336;
  const cx = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="100%" height="100%" fill="white"/>
  <circle cx="${cx}" cy="${cx}" r="${size * 0.45}" fill="none" stroke="black" stroke-width="2"/>
  <text x="${cx}" y="${cx - 40}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="18" fill="black">ARKANSAS</text>
  <text x="${cx}" y="${cx - 16}" text-anchor="middle" font-family="sans-serif" font-size="14" fill="black">LICENSED</text>
  <text x="${cx}" y="${cx + 10}" text-anchor="middle" font-family="sans-serif" font-size="16" fill="black">No. ${escapeXml(license || "00000")}</text>
  <text x="${cx}" y="${cx + 34}" text-anchor="middle" font-family="sans-serif" font-size="14" fill="black">PROFESSIONAL</text>
  <text x="${cx}" y="${cx + 56}" text-anchor="middle" font-family="sans-serif" font-size="14" fill="black">ENGINEER</text>
  <text x="${cx}" y="${cx + 80}" text-anchor="middle" font-family="sans-serif" font-size="16" fill="black">${escapeXml(name)}</text>
</svg>`;
}
