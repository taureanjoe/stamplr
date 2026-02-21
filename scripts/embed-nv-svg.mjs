import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svgPath = path.join(process.env.HOME || "", "Downloads", "NV-Nevada-Eng.svg");
const svg = fs.readFileSync(svgPath, "utf8");
const escaped = svg.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
const out = "export const NV_SVG = `" + escaped + "`;\n";
const outPath = path.join(__dirname, "..", "lib", "stamp", "templates", "nv-svg-data.ts");
fs.writeFileSync(outPath, out);
console.log("Wrote", outPath, "length", out.length);
