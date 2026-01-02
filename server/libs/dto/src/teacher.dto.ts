export interface SaveTeacherDTO {
  name: string;
  password?: string;
  email: string;
  phone: string;
  avatar?: string;

  qualification: string;
  experienceYears: number;
  joiningDate: Date;
}
