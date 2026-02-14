/**
 * Utilities for replacing placeholder text in SVG stamp templates.
 * Supports both data-placeholder attributes and content-based matching.
 * Preserves font, size, position from the template when replacing.
 */

export function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Placeholder patterns: [placeholderId, contentPatterns to match] */
const NAME_PLACEHOLDERS = ["JOHN M. DOE", "JOHN DOE", "Your Name", "NAME"];
const LICENSE_PLACEHOLDERS = ["000000", "No. PE123456", "123456", "LICENSE"];
const DISCIPLINE_PLACEHOLDERS = ["Professional Engineer", "CIVIL", "Civil", "DISCIPLINE"];

/**
 * Replace placeholder text in SVG by matching content.
 * Preserves all attributes (font, size, position) from the template.
 * Returns true if any replacement was made.
 */
function replaceByContent(
  svg: string,
  patterns: string[],
  replacement: string
): { svg: string; replaced: boolean } {
  let replaced = false;
  const escaped = escapeXml(replacement);
  for (const pattern of patterns) {
    const escapedPattern = pattern
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\s+/g, "\\s+");
    // Match <text ...>content</text> - content can include nested elements like <tspan>
    const regex = new RegExp(
      `<text([^>]*)>\\s*(?:[^<]*(?:<(?!/text>)[^>]*>[^<]*)*)?\\s*${escapedPattern}\\s*(?:[^<]*(?:<(?!/text>)[^>]*>[^<]*)*)?\\s*</text>`,
      "gi"
    );
    let newSvg = svg;
    // Simpler: match text elements containing the pattern anywhere in their content
    const simpleRegex = new RegExp(
      `(<text[^>]*>)([\\s\\S]*?)(</text>)`,
      "gi"
    );
    newSvg = svg.replace(simpleRegex, (full, open, content, close) => {
      const patternRegex = new RegExp(escapedPattern.replace(/\\s\+/g, "\\s*"), "i");
      if (patternRegex.test(content)) {
        replaced = true;
        return `${open}${escaped}${close}`;
      }
      return full;
    });
    if (newSvg !== svg) {
      svg = newSvg;
      break; // One match per field
    }
  }
  return { svg, replaced };
}

/**
 * Replace placeholder text by data-placeholder attribute.
 * Most reliable method - use data-placeholder="name" in your SVG.
 * Supports both double and single quotes. Handles nested elements (e.g. tspan).
 */
function replaceByDataAttr(
  svg: string,
  attrValue: string,
  replacement: string
): { svg: string; replaced: boolean } {
  // Match data-placeholder="name" or data-placeholder='name'. Content can include <tspan> etc.
  const regex = new RegExp(
    `<text([^>]*(?:data-placeholder=["']${attrValue}["'])[^>]*)>[\\s\\S]*?</text>`,
    "gi"
  );
  const escaped = escapeXml(replacement);
  const newSvg = svg.replace(regex, (_, attrs) => {
    return `<text${attrs}>${escaped}</text>`;
  });
  return { svg: newSvg, replaced: newSvg !== svg };
}

/**
 * Replace name placeholder. Tries data-placeholder first, then content match.
 */
export function replaceNamePlaceholder(
  svg: string,
  name: string
): { svg: string; replaced: boolean } {
  let result = replaceByDataAttr(svg, "name", name);
  if (result.replaced) return result;
  return replaceByContent(svg, NAME_PLACEHOLDERS, name);
}

/**
 * Replace license placeholder.
 */
export function replaceLicensePlaceholder(
  svg: string,
  license: string
): { svg: string; replaced: boolean } {
  let result = replaceByDataAttr(svg, "license", license);
  if (result.replaced) return result;
  return replaceByContent(svg, LICENSE_PLACEHOLDERS, license);
}

/**
 * Replace discipline placeholder.
 */
export function replaceDisciplinePlaceholder(
  svg: string,
  discipline: string
): { svg: string; replaced: boolean } {
  let result = replaceByDataAttr(svg, "discipline", discipline);
  if (result.replaced) return result;
  return replaceByContent(svg, DISCIPLINE_PLACEHOLDERS, discipline);
}
