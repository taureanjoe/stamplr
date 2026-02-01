# StampLr – Future Notes & Requirements

Reference for later phases. Not all items are implemented in the current POC.

## Product

- **App name:** StampLr (not StampCraft).
- **Purpose:** Engineers (and later notaries, etc.) download their **license stamp** in multiple formats.
- **Download formats:** SVG, CAD DWG, PNG, PDF, TIFF. (POC: SVG, PNG, PDF first; DWG and TIFF when needed.)
- **Stamp types:** Different licensed stamps – e.g. **PE (Professional Engineer)**, **Notary**, etc. Start with Texas PE.
- **Customization:** User can set **field** (e.g. Mechanical, Civil) and **license number**. Template art stays fixed; only name and license number are editable for Texas.

## Texas stamp (current)

- Use the fixed SVG template (`lib/stamp/templates/texas-reference.svg`). **Keep everything as-is** except **name** and **license number**.
- Match the **size and font** of the text in the template when injecting name and license.

## UX & Design

- Match the **StampCraft Pro**-style reference: hero (“Professional Seals, Reimagined for Engineers & Notaries”), “Design Your Stamp” / “Learn More”, Key Features (Cloud Vault & Sync, Smart Compliance Check, Team Management & Roles, Digital & Physical Output).
- **Responsive:** Easy to use on **mobile and desktop**.
- Nav: Products, Solutions, Features, Pricing, Support; Sign In (placeholders for now).

## Deployment & Stack

- **Frontend:** Deploy to **Vercel** when ready.
- **Backend/DB:** Use **Supabase** later when we need to store data and have more users.
- **POC:** Must run easily **locally** (`npm run dev`).

## Technical (for later)

- Cloud Vault & Sync → Supabase storage + sync.
- Smart Compliance Check → validation rules per state/type.
- Team Management & Roles → multi-user, roles (future).
- CAD DWG and TIFF export → add when required.
