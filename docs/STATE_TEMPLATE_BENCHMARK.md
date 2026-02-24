# State template benchmark (Nevada)

Use Nevada as the reference for adding new state stamps, especially when the stamp has **license number on a circular path** at the bottom.

## How we solved the Nevada license-on-arc issue

### Requirement
- "No. 00000" must follow the **bottom arc** of the inner circle, curved (not straight).
- Text should read **left to right**, right-side up, centered at the very bottom of the seal.
- Use **`<textPath>`** on a circular arc; no transform/rotate hacks.

### What did **not** work
- **path10 in the source SVG** was the **top** arc (circle center ~167,27), so using it put the license at the top. We do not use path10 for the license.
- **Right-to-left arc** (e.g. `M 286,168 A 118,118 0 0 1 50,168`) placed text at the bottom but letters were upside down.
- **Flipping/rotating the text** (scale, transform) was fragile and wrong; the fix must come from **arc direction** only.
- **sweep-flag=1** (clockwise) left→right put the arc at the **top** in our viewer; we needed the **bottom** arc.

### What worked
- **Bottom arc:** Left-to-right arc that **bows downward**, so the text sits on the bottom curve.
- **sweep-flag=0** (counter-clockwise): From left to right at the same vertical height, a counter-clockwise arc bows **downward** (bottom arc). Clockwise would bow upward (top arc).
- **Path (viewBox 0 0 336 336, center 168,168):**
  ```text
  M 35,168 A 133,133 0 0 0 301,168
  ```
  - Start: left side at vertical center (35, 168).
  - End: right side at vertical center (301, 168).
  - Radius **133** = just inside the inner decorative ring (tune 122–133 for “middle of ring”).
  - **sweep-flag=0** = counter-clockwise = arc bows downward = text on bottom.
- **No transform on text:** Plain `<text><textPath xlink:href="#license-arc" startOffset="50%" text-anchor="middle">No. 00000</textPath></text>`.
- **Inject arc in `<defs>`:** We add `<path id="license-arc" d="..."/>` into the SVG’s `<defs>` so `<textPath href="#license-arc">` resolves. Do not use a path from the source SVG unless you’ve verified it is the **bottom** arc (e.g. by checking its transform and `d` in the rendered view).

### Rule of thumb for new states
- **A counter-clockwise arc (sweep-flag=0) from left to right**, between two points at the same vertical height, produces a **bottom-facing** curve where text reads correctly left to right.
- **Radius:** Pick a value that puts the arc “in the middle of the ring” (between inner and outer circle). For 336×336 viewBox, center 168,168, we use radius **133** for Nevada; adjust per state art.
- **startOffset="50%"** and **text-anchor="middle"** center the “No. XXXXX” on the arc.

### Files
- **Template:** `lib/stamp/templates/nevada.ts` — replaces path id="text8" with `<text><textPath href="#license-arc">`, injects `license-arc` in defs.
- **Data:** `lib/stamp/templates/nv-svg-data.ts` — embedded SVG from `scripts/embed-nv-svg.mjs` (run after changing the source SVG).
- **Expiration:** Nevada uses three 2-digit inputs (MM / DD / YY) composed as `MM/DD/YY`; see `app/design/page.tsx` and `requiresExpiration` in `lib/stamp/constants.ts`.
