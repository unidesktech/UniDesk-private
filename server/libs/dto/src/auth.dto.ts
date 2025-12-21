export interface LoginDto {
  schoolCode: string;
  emailOrUid: string;
  password: string;
}

export interface RequestOTPDto {
  schoolCode: string;
  email: string;
}
