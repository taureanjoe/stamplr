# SOP: Stamps with Text on Circular / Curved Paths

When a state stamp has **text that follows a circular or curved path** (e.g. name or discipline around the seal), the SVG must be handled differently from flat text. Browsers render `<textPath>` correctly only when the path is a **`<path>` element with arc/circle data** in the DOM, not when it references a `<circle>` or when the path is missing. This doc is the SOP for adding or updating such stamps.

---

## 1. How it works (reference: Alabama, Nevada, California)

- **Defs:** The template SVG should have **empty defs** (e.g. `<defs id="defs1" />`) or defs you will replace. Do **not** rely on `<circle>` elements as the path for `<textPath>` when the SVG is inlined in HTML.
- **At render time** the state’s renderer:
  1. Injects **`<path>` elements** into defs with arc path data (`d="M ... A ..."`).
  2. **Replaces** the whole `<text>…<textPath>…</textPath></text>` block(s) with new `<text><textPath xlink:href="#arc-id" startOffset="50%" text-anchor="middle">…</textPath></text>` that reference those path IDs.
- **Flat text** (e.g. license number in a `<tspan>`) can still be updated with a simple content replace (e.g. by `tspan` id).

---

## 2. SOP: Updating when you have a new or changed SVG

Use this when you get a new SVG (e.g. from the state board or a designer) or need to adjust an existing circular-path stamp.

### Step 1: Inspect the SVG

- Open the SVG in a text editor or browser.
- Find all **curved/circular text**:
  - Look for `<textPath>`, `xlink:href` or `href` pointing to `#something` (often a circle or path id).
  - Note the **parent `<text>` element** (and its `id` if present) and which field each path is for (name, discipline, etc.).
- Find **flat text** (e.g. license number): usually a `<tspan>` with an `id` or predictable content.

### Step 2: Prepare the SVG source (e.g. `*-svg-data.ts`)

- **Defs:** If the SVG uses circles (or paths) in `<defs>` for text-on-path, **remove those** and use an empty defs block, e.g. `<defs id="defs1" />`. The renderer will inject the real paths.
- **Keep** the rest of the SVG (rings, logos, flat text structure). Leave the existing `<text id="…">…<textPath>…</textPath></text>` blocks in place; the renderer will **replace** them by id.
- Ensure the root `<svg>` has `xmlns:xlink="http://www.w3.org/1999/xlink"` (the renderer can add it if missing).
- Export the string as a constant (e.g. `CA_SVG`) in `lib/stamp/templates/<state>-svg-data.ts`.

### Step 3: Define arc paths

- Decide **arc geometry** (viewBox and center). Example: viewBox `0 0 336 336`, center `(168, 168)`.
- For each curved text:
  - **Top arc (e.g. name):** Arc that bows upward. Example: `d="M 66,174 A 102,102 0 0 1 270,174"` (radius 102, center y=174).
  - **Bottom arc (e.g. discipline):** Arc that bows downward. Example: `d="M 49,168 A 119,119 0 0 0 287,168"`.
- Format: `M startX,startY A rx,ry 0 0 sweep endX,endY`. Use same radius for rx and ry for a circular arc. Sweep 1 = counterclockwise (often top), 0 = clockwise (often bottom).
- To **move text “down”**: increase the y in the arc (e.g. change 168 → 174). To move “up”, decrease y.

### Step 4: Implement or update the state renderer (e.g. `california.ts`)

- **Add constants:** Unique path IDs (e.g. `ca-name-arc`, `ca-discipline-arc`) and their `d` strings.
- **Inject defs:** Replace `<defs id="defs1" />` with `<defs id="defs1"><path id="…" d="…"/><path id="…" d="…"/></defs>`.
- **Replace name block:** Regex (or equivalent) to replace the entire `<text id="text19">…</textPath></text>` with new `<text><textPath xlink:href="#ca-name-arc" startOffset="50%" text-anchor="middle">${escapeXml(name)}</textPath></text>` (use the correct text id from your SVG).
- **Replace discipline block:** Same idea for the discipline `<text>` block and its path ID.
- **License / flat text:** Replace only the content of the relevant `<tspan>` (or flat `<text>`) by id, using `escapeXml`.
- **Optional:** Ensure `xmlns:xlink` on `<svg>` if not present.

### Step 5: Register and test

- Register the state and template in `lib/stamp/constants.ts` and any index that maps state → renderer.
- Open the design page, select the state, and confirm:
  - Name and discipline (or placeholders) appear on the curved path.
  - License number appears in the correct place.
- If curved text is too high/low, go back to Step 3 and adjust the arc `d` (e.g. y values).

---

## 3. Reusable prompt for another state (copy and customize)

Use this prompt when you want to add or fix a **different state** that has text on a circular/curved path. Replace the bracketed parts with your state and details.

```
Our app renders state PE stamps. Some stamps have text on a circular or curved path (e.g. name or discipline around the seal). For those we use this pattern (see Alabama, Nevada, California in the codebase):

1. The SVG template has empty defs (e.g. `<defs id="defs1" />`). No circles in defs for textPath.
2. At render time we inject <path> elements into defs with arc path data (d="M ... A ..."), with unique IDs (e.g. state-name-arc, state-discipline-arc).
3. We replace the entire <text id="...">…<textPath>…</textPath></text> blocks with new <text><textPath xlink:href="#state-name-arc" startOffset="50%" text-anchor="middle">NAME</textPath></text> (and similarly for discipline), using the correct path IDs and escaping text.
4. Flat text (e.g. license number) we update by replacing only the content inside the relevant tspan/text by id.

I need to [add support for | fix the stamp for] [STATE_NAME]. The SVG has [describe: e.g. name on top arc, discipline on bottom arc, license number in center]. [If you have the SVG or file path, paste or reference it.]

Please:
- Add or update the SVG source in lib/stamp/templates/[state]-svg-data.ts (empty defs, keep structure for text blocks we will replace).
- Implement or update the renderer in lib/stamp/templates/[state].ts to inject the path arcs and replace the name and discipline text blocks with textPath elements referencing those paths, and update license number by tspan/id.
- Use the same pattern as California/Alabama/Nevada (see lib/stamp/templates/california.ts and docs/STAMP_CIRCULAR_TEXT_SOP.md).
- If the name or discipline needs to move up/down, adjust the arc path d (change the y values in the arc).
```

---

## 4. Quick reference: Arc path and vertical position

- **Arc path:** `M startX,startY A rx,ry 0 0 sweep endX,endY`
  - Same rx and ry for a circular arc.
  - Sweep: `1` = counterclockwise (arc above the line), `0` = clockwise (arc below).
- **Move name/text down:** Increase `startY` and `endY` (and arc center y) in that path (e.g. 168 → 174).
- **Move name/text up:** Decrease those y values.

See `lib/stamp/templates/california.ts` for a full example (name arc, discipline arc, license tspan).
