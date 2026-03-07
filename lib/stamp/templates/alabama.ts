/**
 * Alabama PE stamp renderer.
 *
 * Editable fields:
 * - Name (JOHN M. DOE): flattened <path id="text14-5"> → replaced with <text><textPath> on bottom arc.
 * - License number: <tspan id="tspan14"> contains "No. 00000" → update number only.
 *
 * Static art (path11): tick marks, dotted circle, stars, ALABAMA, LICENSED, PROFESSIONAL, ENGINEER.
 *
 * Bottom-arc approach (from STATE_TEMPLATE_BENCHMARK.md):
 *   Counter-clockwise arc (sweep-flag=0) left→right bows downward → text at bottom reads L→R.
 *   Radius ~139 matches original outlined-text position (~139px from center 168,168).
 */
import type { StampRenderOptions } from "@/lib/stamp/types";
import { escapeXml } from "./placeholder-utils";
import { AL_SVG } from "./al-svg-data";

const NAME_ARC_RADIUS = 145;
const CENTER = 168;
const NAME_ARC_ID = "name-arc";

function buildNameArcPath(): string {
  const startX = CENTER - NAME_ARC_RADIUS;
  const endX = CENTER + NAME_ARC_RADIUS;
  return `M ${startX},${CENTER} A ${NAME_ARC_RADIUS},${NAME_ARC_RADIUS} 0 0 0 ${endX},${CENTER}`;
}

/** Update only the number portion of "No. 00000" in tspan14. */
function updateLicenseNumber(svg: string, number: string): string {
  const re = /(<tspan[^>]*\bid="tspan14"[^>]*>)([^<]*?)(<\/tspan>)/s;
  const label = `No. ${escapeXml(number || "00000")}`;
  return svg.replace(re, (_, open, _content, close) => open + label + close);
}

/** Remove the outlined name path and inject a live <text><textPath> on the bottom arc. */
function replaceNamePathWithTextOnArc(svg: string, name: string): string {
  if (!svg.includes("xmlns:xlink")) {
    svg = svg.replace(/<svg\s/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ');
  }

  const arcD = buildNameArcPath();
  if (svg.includes('id="defs1"')) {
    svg = svg.replace(
      /<defs\s+id="defs1"\s*\/>/,
      `<defs id="defs1"><path id="${NAME_ARC_ID}" d="${arcD}"/></defs>`
    );
  }

  const displayName = escapeXml((name || "JOHN M. DOE").toUpperCase());
  const textEl =
    `<text font-family="Damascus, 'Noto Sans', sans-serif" font-size="26.6667" fill="#000000">` +
    `<textPath xlink:href="#${NAME_ARC_ID}" startOffset="50%" text-anchor="middle">${displayName}</textPath></text>`;

  const marker = 'id="text14-5"';
  const idx = svg.indexOf(marker);
  if (idx !== -1) {
    const pathStart = svg.lastIndexOf("<path", idx);
    const pathEnd = svg.indexOf("/>", idx);
    if (pathStart !== -1 && pathEnd !== -1) {
      const pathEndInclusive = pathEnd + 2;
      const segment = svg.slice(pathStart, pathEndInclusive);
      if (segment.includes(marker)) {
        svg = svg.slice(0, pathStart) + textEl + svg.slice(pathEndInclusive);
      }
    }
  } else {
    const insertPoint = svg.lastIndexOf("</g>");
    if (insertPoint !== -1) svg = svg.slice(0, insertPoint) + textEl + svg.slice(insertPoint);
  }

  return svg;
}

export function renderAlabamaStamp(options: StampRenderOptions): string {
  try {
    let svg = String(AL_SVG ?? "").trim();
    if (!svg.startsWith("<svg")) return fallbackALStamp(options);

    svg = svg
      .replace(/\bwidth="3\.5in"/, 'width="336"')
      .replace(/\bheight="3\.5in"/, 'height="336"');

    const name = (options.name ?? "").trim().toUpperCase() || "JOHN M. DOE";
    const number = (options.licenseNumber ?? "").trim();

    svg = updateLicenseNumber(svg, number);
    svg = replaceNamePathWithTextOnArc(svg, name);

    if (options.watermarked) {
      svg = svg.replace(
        "</svg>",
        '<text x="168" y="168" text-anchor="middle" fill="#ccc" font-size="48" font-weight="bold" font-family="sans-serif" opacity="0.5">SAMPLE</text>\n</svg>'
      );
    }
    return svg;
  } catch {
    return fallbackALStamp(options);
  }
}

function fallbackALStamp(options: StampRenderOptions): string {
  const name = (options.name ?? "").trim().toUpperCase() || "JOHN M. DOE";
  const license = (options.licenseNumber ?? "").trim();
  const size = 336;
  const cx = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="100%" height="100%" fill="white"/>
  <circle cx="${cx}" cy="${cx}" r="${size * 0.45}" fill="none" stroke="black" stroke-width="2"/>
  <text x="${cx}" y="${cx - 40}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="18" fill="black">ALABAMA</text>
  <text x="${cx}" y="${cx - 16}" text-anchor="middle" font-family="sans-serif" font-size="14" fill="black">LICENSED</text>
  <text x="${cx}" y="${cx + 10}" text-anchor="middle" font-family="sans-serif" font-size="16" fill="black">No. ${escapeXml(license || "00000")}</text>
  <text x="${cx}" y="${cx + 34}" text-anchor="middle" font-family="sans-serif" font-size="14" fill="black">PROFESSIONAL</text>
  <text x="${cx}" y="${cx + 56}" text-anchor="middle" font-family="sans-serif" font-size="14" fill="black">ENGINEER</text>
  <text x="${cx}" y="${cx + 80}" text-anchor="middle" font-family="sans-serif" font-size="16" fill="black">${escapeXml(name)}</text>
</svg>`;
}
