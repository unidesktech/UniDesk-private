export interface SaveStudentDto {
  user: {
    user_id?: string;
    email: string;
    phone?: string;
    name: string;
  };

  student: {
    admission_no: string;
    dob: Date;
    gender?: string;
    class_id?: string;
    section_id?: string;
  };

  parent?: {
    user: {
      email: string;
      phone?: string;
      name: string;
    };
    profile: {
      occupation?: string;
      relation_to_student: string;
      annual_income?: number;
    };
  };
}
