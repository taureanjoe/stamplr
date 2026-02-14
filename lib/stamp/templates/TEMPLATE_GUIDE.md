# Stamp Template Guide

This guide explains how to create SVG stamp templates that work with StampLr's text replacement.

## How It Works

StampLr supports **two** ways to define editable text in your template:

1. **Text placeholders (recommended)** – Add `<text>` elements with placeholder content. The app **replaces** the content in place, preserving your font, size, position, and styling.
2. **Inject fallback** – If no placeholders are found, the app injects text at default positions. This may not match your design.

## Recommended: Text Placeholders

Add `<text>` elements to your SVG with one of these approaches:

### Option A: `data-placeholder` attribute (most reliable)

```xml
<text x="1170" y="1050" text-anchor="middle" font-family="Technical Sans, Arial, sans-serif" font-weight="bold" font-size="130" fill="black" data-placeholder="name">JOHN M. DOE</text>
<text x="1170" y="1250" text-anchor="middle" font-family="Technical Sans, Arial, sans-serif" font-weight="bold" font-size="110" fill="black" data-placeholder="license">No. PE123456</text>
<text x="1170" y="1450" text-anchor="middle" font-family="Technical Sans, Arial, sans-serif" font-weight="bold" font-size="90" fill="black" data-placeholder="discipline">Professional Engineer</text>
```

- `data-placeholder="name"` – Replaced with user's name
- `data-placeholder="license"` – Replaced with license number
- `data-placeholder="discipline"` – Replaced with discipline (MA and states that require it)

### Option B: Content matching

Use these exact placeholder strings as the text content. The app will find and replace them:

| Field      | Placeholder options                    |
|-----------|----------------------------------------|
| Name      | `JOHN M. DOE`, `JOHN DOE`, `Your Name` |
| License   | `000000`, `No. PE123456`, `123456`     |
| Discipline| `Professional Engineer`, `CIVIL`       |

Example:

```xml
<text x="1170" y="1050" font-family="Technical Sans, Arial, sans-serif" font-size="130" font-weight="bold" fill="black">JOHN M. DOE</text>
<text x="1170" y="1250" font-family="Technical Sans, Arial, sans-serif" font-size="110" font-weight="bold" fill="black">No. PE123456</text>
```

## Font: Technical Sans-Serif

For professional stamp appearance, use **Technical Sans** (or similar technical sans-serif). The app uses:

```
"Technical Sans", "Technic", Arial, sans-serif
```

- If your design tool uses "Technical Sans" or "Technic", set that as `font-family` in the placeholder text.
- Arial is the fallback when Technical Sans is not available.
- When using placeholders, the app preserves your template's font – so set the correct font in the SVG.

## Future: Arc / Curved Text

For designs that need text along a curve (e.g., around the seal), SVG supports `<textPath>`:

```xml
<defs>
  <path id="nameArc" d="M 100 100 A 80 80 0 0 1 200 100"/>
</defs>
<text>
  <textPath href="#nameArc" data-placeholder="name">JOHN M. DOE</textPath>
</text>
```

Support for `textPath` placeholders can be added when needed.

## Checklist for New Templates

1. Add `<text>` elements for name, license, (and discipline if required).
2. Use `data-placeholder="name"` etc., or the exact placeholder content.
3. Set `font-family` to match your design (e.g. Technical Sans).
4. Set `font-size`, `x`, `y`, `text-anchor` for correct layout.
5. Save as `*-reference.svg` in `lib/stamp/templates/`.
6. Register the template in `lib/stamp/constants.ts` and `lib/stamp/index.ts`.
