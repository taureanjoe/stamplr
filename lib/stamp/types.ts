export interface StampOptions {
  stateCode: string;
  stateName: string;
  template: "texas" | "generic";
  stampType: string;
  name: string;
  licenseNumber: string;
  discipline: string;
}

export interface StampRenderOptions extends StampOptions {
  watermarked?: boolean;
  size?: number;
}
