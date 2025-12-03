import { JsonValue } from 'libs/prisma/generated/runtime/client';

export interface SchoolBasicInfoDTO {
  school_id: string;
  school_code: string;
  name: string;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  established?: Date | null;
  config?: JsonValue | null;

  subscription?: BasicSubscriptionDetailsDTO | null;
  school_branding?: SchoolBrandingDTO | null;

  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

interface BasicSubscriptionDetailsDTO {
  status?: string | null;
  plan_type?: string | null;
  price_per_month?: number | null;
  billing_cycle?: string | null;
  valid_from?: Date | null;
  valid_to?: Date | null;
}

export interface SchoolBrandingDTO {
  logo_url?: string | null;
  banner_url?: string | null;
  primary_color?: string | null;
  secondary_color?: string | null;
  ascent_color?: string | null;
  theme_mode?: string | null;
  login_screen_config?: JsonValue | null;
  header_footer_config?: JsonValue | null;
}

export interface SchoolPreview {
  school_id: string;
  name: string;
  address?: string;
  logo_url?: string;
  is_active: boolean;
}
