import { NextRequest } from "next/server";
import { renderStamp } from "@/lib/stamp";
import { STATES_WITH_TEMPLATES } from "@/lib/stamp/constants";
import type { StampRenderOptions } from "@/lib/stamp/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
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
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
