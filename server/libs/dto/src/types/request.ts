import { Request } from 'express';

export interface AuthenticatedUser {
  user_id: string;
  school_id: string;
  name: string;
  email: string;
  profile_photo_url: string;
  user_code: string;
}

export interface AuthenticatedRequest extends Request {
  cookies: Record<string, unknown>;
  user?: AuthenticatedUser;
}
