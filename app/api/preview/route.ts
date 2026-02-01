import { NextRequest } from "next/server";
import { renderStamp } from "@/lib/stamp";
import { US_STATES } from "@/lib/stamp/constants";
import type { StampRenderOptions } from "@/lib/stamp/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const stateCode = searchParams.get("state") ?? "tx";
  const name = searchParams.get("name") ?? "JOHN M. DOE";
  const licenseNumber = searchParams.get("license") ?? "000000";
  const discipline = searchParams.get("discipline") ?? "Civil";
  const watermarked = searchParams.get("watermarked") === "1";

  const state = US_STATES.find((s) => s.code === stateCode) ?? US_STATES[0];
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
    headers: { "Content-Type": "image/svg+xml" },
  });
}
