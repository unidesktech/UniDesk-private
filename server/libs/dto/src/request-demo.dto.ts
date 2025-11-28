export interface RequestDemoDTO {
  request_id?: string;
  school_id?: string | null;

  organization: string;
  organization_size: string;
  full_name: string;
  contact_email: string;
  contact_phone?: string | null;
  country?: string | null;
  city?: string | null;

  message?: string | null;
  source?: string | null;
  status?: string;

  scheduled_date: string;
  scheduled_time: string;

  scheduled_demo_at?: Date | null;

  is_active?: boolean;
  is_deleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
  comments?: string | null;
}
