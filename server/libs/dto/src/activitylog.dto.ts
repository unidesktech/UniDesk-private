export interface ActivityLogPayload {
  school_id: string;
  user_id?: string;

  action_type: string;
  description: string;

  ip_address?: string;
  config?: Record<string, any>;

  comments?: string;
}
