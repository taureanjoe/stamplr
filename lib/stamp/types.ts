export interface StampOptions {
  stateCode: string;
  stateName: string;
  template: string;
  stampType: string;
  name: string;
  licenseNumber: string;
  /** Engineering discipline (Civil, Mechanical, etc.) - used when state requires it */
  discipline: string;
  /** Expiration date (e.g. MM/DD/YY) - used when state requires it (e.g. Nevada) */
  expirationDate?: string;
}

export interface StampRenderOptions extends StampOptions {
  watermarked?: boolean;
  size?: number;
}
