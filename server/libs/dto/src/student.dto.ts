// export class SaveStudentDto {
//   user: {
//     name: string;
//     email: string;
//     phone?: string;
//   };

//   student: {
//     admission_no: string;
//     dob: Date;
//     gender?: string;
//     blood_group?: string;
//     emergencyContactNo?: string;
//     class_id?: string;
//     section_id?: string;
//     comments?: string;
//   };

//   parent?: {
//     user: {
//       name: string;
//       email: string;
//       phone?: string;
//     };
//     profile: {
//       occupation?: string;
//       relation_to_student?: string;
//       annual_income?: number;
//     };
//   };
// }

export class SaveStudentDto {
  student!: {
    name: string;
    email: string;
    phone?: string;
    avatar?: string;            // profile photo URL
    password?: string;          // optional password
    admission_no: string;
    dob: Date;
    gender?: string;
    blood_group?: string;
    emergencyContactNo?: string;
    class_id?: string;
    section_id?: string;
    comments?: string;
  };

  parents?: Array<{
    name: string;
    email: string;
    phone?: string;
    avatar?: string;            // optional profile photo
    password?: string;          // optional password
    relation: string;
    occupation?: string;
    annual_income?: number;
  }>;
}

