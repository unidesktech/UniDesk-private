export class SaveParentDto {
  name!: string;
  email!: string;
  phone?: string;
  avatar?: string;
  password?: string;

  occupation?: string;
  annual_income?: number;

  student_id!: string;
  relation!: string;
}