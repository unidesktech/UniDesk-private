export interface LoginDto {
  schoolCode: string;
  emailOrUid: string;
  password: string;
}

export interface RequestOTPDto {
  schoolCode: string;
  email: string;
}

export interface AuthenticatedUser {
  user_id: string;
  school_id: string | null;
  name: string | null;
  email: string | null;
  profile_photo_url: string | null;
  user_code: string;
}
