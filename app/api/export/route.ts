import { NextRequest } from "next/server";
import { renderStamp } from "@/lib/stamp";
import { STATES_WITH_TEMPLATES } from "@/lib/stamp/constants";
import type { StampRenderOptions } from "@/lib/stamp/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = (searchParams.get("format") ?? "svg").toLowerCase();
    const stateCode = searchParams.get("state") ?? "tx";
    const name = searchParams.get("name") ?? "JOHN M. DOE";
    const licenseNumber = searchParams.get("license") ?? "000000";
    const discipline = searchParams.get("discipline") ?? "Professional Engineer";
    const watermarked = searchParams.get("watermarked") === "1";

    const state = STATES_WITH_TEMPLATES.find((s) => s.code === stateCode) ?? STATES_WITH_TEMPLATES[0];
    const options: StampRenderOptions = {
      stateCode: state.code,
      stateName: state.name,
      template: state.template,
      stampType: "pe",
      name,
      licenseNumber,
      discipline,
      watermarked,
      size: 400,
    };

    const svg = renderStamp(options);

    if (format === "svg") {
      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Content-Disposition": 'attachment; filename="stamp.svg"',
        },
      });
    }

    const size = 400;
    const svgBuffer = Buffer.from(svg, "utf-8");

    if (format === "png") {
      const sharp = (await import("sharp")).default;
      const png = await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toBuffer();
      return new Response(new Uint8Array(png), {
        headers: {
          "Content-Type": "image/png",
          "Content-Disposition": 'attachment; filename="stamp.png"',
        },
      });
    }

    if (format === "pdf") {
      const sharp = (await import("sharp")).default;
      const { jsPDF } = await import("jspdf");
      const png = await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toBuffer();
      const doc = new jsPDF({ unit: "pt", format: [size, size] });
      doc.addImage(png.toString("base64"), "PNG", 0, 0, size, size);
      const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
      return new Response(new Uint8Array(pdfBuffer), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="stamp.pdf"',
        },
      });
    }

    return new Response("Unsupported format. Use svg, png, or pdf.", {
      status: 400,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Export API error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
