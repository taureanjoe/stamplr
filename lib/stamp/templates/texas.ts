/**
 * Texas PE stamp: uses the fixed reference SVG. Only name and license number are replaced.
 * Text size and font match the template (path bounds ~459–526 for name, ~594–660 for license).
 */
import type { StampRenderOptions } from "@/lib/stamp/types";
import { readFileSync } from "fs";
import { join } from "path";

const TEMPLATE_PATH = join(process.cwd(), "lib", "stamp", "templates", "texas-reference.svg");

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function renderTexasStamp(options: StampRenderOptions): string {
  let svg: string;
  try {
    svg = readFileSync(TEMPLATE_PATH, "utf-8");
  } catch {
    return fallbackTexasStamp(options);
  }

  const name = (options.name || "JOHN M. DOE").toUpperCase();
  const license = options.licenseNumber || "000000";

  svg = svg.replace(
    /<rect width="970" height="971" fill="#1E1E1E"\/>/,
    '<rect width="970" height="971" fill="white"/>'
  );
  svg = svg.replace(/<path d="[^"]*" fill="black"\/>\n?/g, "");

  const nameFontSize = 54;
  const licenseFontSize = 52;
  const fontFamily = "Arial, sans-serif";
  const textBlock = `
  <text x="485" y="492" text-anchor="middle" font-family="${fontFamily}" font-weight="bold" font-size="${nameFontSize}" fill="black">${escapeXml(name)}</text>
  <text x="485" y="627" text-anchor="middle" font-family="${fontFamily}" font-weight="bold" font-size="${licenseFontSize}" fill="black">${escapeXml(license)}</text>`;

  svg = svg.replace("</svg>", `${textBlock}\n</svg>`);

  if (options.watermarked) {
    svg = svg.replace(
      "</svg>",
      `<text x="485" y="492" text-anchor="middle" fill="#ccc" font-size="54" font-weight="bold" font-family="Arial, sans-serif">SAMPLE</text>\n</svg>`
    );
  }

  return svg;
}

function fallbackTexasStamp(options: StampRenderOptions): string {
  const name = (options.name || "JOHN M. DOE").toUpperCase();
  const license = options.licenseNumber || "000000";
  const size = options.size ?? 400;
  const cx = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="100%" height="100%" fill="white"/>
  <circle cx="${cx}" cy="${cx}" r="${size * 0.45}" fill="none" stroke="black" stroke-width="2"/>
  <text x="${cx}" y="${cx - 20}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="16" fill="black">STATE OF TEXAS</text>
  <text x="${cx}" y="${cx}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="18" fill="black">${escapeXml(name)}</text>
  <text x="${cx}" y="${cx + 24}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="14" fill="black">${escapeXml(license)}</text>
  <text x="${cx}" y="${cx + 50}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="12" fill="black">PROFESSIONAL ENGINEER</text>
</svg>`;
}
