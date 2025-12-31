import { uuidv7 } from 'uuidv7';
import {
  CLASS_ID,
  PARENT_USER_ID,
  SCHOOL_ID,
  SECTION_ID,
  STUDENT_USER_ID,
  TEACHER_USER_ID,
} from './constants';
import { prisma } from './prisma.client';

export async function seedAcademicData() {
  console.log(
    '🌱 Seeding Classes, Sections, Subjects, Teachers, Students & Parents...',
  );

  await prisma.$transaction(async (tx) => {
    const academicYear = await tx.academic_years.upsert({
      where: {
        school_id_name: {
          school_id: SCHOOL_ID,
          name: '2024-2025',
        },
      },
      update: {},
      create: {
        year_id: uuidv7(),
        school_id: SCHOOL_ID,
        name: '2024-2025',
        start_date: new Date('2024-04-01'),
        end_date: new Date('2025-03-31'),
      },
    });
    await tx.users.upsert({
      where: { user_id: TEACHER_USER_ID },
      update: {},
      create: {
        user_id: TEACHER_USER_ID,
        school_id: SCHOOL_ID,
        user_code: 'TCH001',
        name: 'Amit Sharma',
        email: 'teacher@unidesk.com',
        status: 'active',
      },
    });

    await tx.users.upsert({
      where: { user_id: STUDENT_USER_ID },
      update: {},
      create: {
        user_id: STUDENT_USER_ID,
        school_id: SCHOOL_ID,
        user_code: 'STD001',
        name: 'Rohit Kumar',
        email: 'student@unidesk.com',
        status: 'active',
      },
    });

    await tx.users.upsert({
      where: { user_id: PARENT_USER_ID },
      update: {},
      create: {
        user_id: PARENT_USER_ID,
        school_id: SCHOOL_ID,
        user_code: 'PAR001',
        name: 'Suresh Kumar',
        email: 'parent@unidesk.com',
        status: 'active',
      },
    });

    const class10 = await tx.classes.upsert({
      where: { class_id: CLASS_ID },
      update: {},
      create: {
        class_id: CLASS_ID,
        school_id: SCHOOL_ID,
        year_id: academicYear.year_id,
        name: 'Class 10',
      },
    });

    const sectionA = await tx.sections.upsert({
      where: { section_id: SECTION_ID },
      update: {},
      create: {
        section_id: SECTION_ID,
        class_id: class10.class_id,
        name: 'A',
      },
    });

    const math = await tx.subjects.upsert({
      where: {
        school_id_year_id_name: {
          school_id: SCHOOL_ID,
          year_id: academicYear.year_id,
          name: 'Mathematics',
        },
      },
      update: {},
      create: {
        subject_id: uuidv7(),
        school_id: SCHOOL_ID,
        year_id: academicYear.year_id,
        name: 'Mathematics',
        code: 'MATH-10',
        category: 'Core',
      },
    });

    const science = await tx.subjects.upsert({
      where: {
        school_id_year_id_name: {
          school_id: SCHOOL_ID,
          year_id: academicYear.year_id,
          name: 'Science',
        },
      },
      update: {},
      create: {
        subject_id: uuidv7(),
        school_id: SCHOOL_ID,
        year_id: academicYear.year_id,
        name: 'Science',
        code: 'SCI-10',
        category: 'Core',
      },
    });

    const classMath = await tx.class_subjects.upsert({
      where: {
        class_id_subject_id: {
          class_id: class10.class_id,
          subject_id: math.subject_id,
        },
      },
      update: {},
      create: {
        class_subject_id: uuidv7(),
        class_id: class10.class_id,
        subject_id: math.subject_id,
      },
    });

    await tx.class_subjects.upsert({
      where: {
        class_id_subject_id: {
          class_id: class10.class_id,
          subject_id: science.subject_id,
        },
      },
      update: {},
      create: {
        class_subject_id: uuidv7(),
        class_id: class10.class_id,
        subject_id: science.subject_id,
      },
    });

    const teacher = await tx.teacher_profiles.upsert({
      where: { user_id: TEACHER_USER_ID },
      update: {},
      create: {
        teacher_id: uuidv7(),
        user_id: TEACHER_USER_ID,
        employee_code: 'EMP1001',
        qualification: 'M.Sc Mathematics',
        joining_date: new Date('2021-06-01'),
        experience_in_years: 8,
      },
    });

    await tx.teacher_subjects.upsert({
      where: {
        teacher_id_class_subject_id: {
          teacher_id: teacher.teacher_id,
          class_subject_id: classMath.class_subject_id,
        },
      },
      update: {},
      create: {
        teacher_subject_id: uuidv7(),
        teacher_id: teacher.teacher_id,
        class_subject_id: classMath.class_subject_id,
      },
    });

    const student = await tx.student_profiles.upsert({
      where: { user_id: STUDENT_USER_ID },
      update: {},
      create: {
        student_id: uuidv7(),
        user_id: STUDENT_USER_ID,
        admission_no: 'ADM2024001',
        dob: new Date('2010-08-15'),
        gender: 'Male',
        class_id: class10.class_id,
        section_id: sectionA.section_id,
      },
    });

    const parent = await tx.parent_profiles.upsert({
      where: { user_id: PARENT_USER_ID },
      update: {},
      create: {
        parent_id: uuidv7(),
        user_id: PARENT_USER_ID,
        occupation: 'Business',
        relation_to_student: 'Father',
        annual_income: 850000,
      },
    });

    await tx.student_parent_map.upsert({
      where: {
        student_id_parent_id: {
          student_id: student.student_id,
          parent_id: parent.parent_id,
        },
      },
      update: {},
      create: {
        student_parent_map_id: uuidv7(),
        student_id: student.student_id,
        parent_id: parent.parent_id,
      },
    });
  });

  console.log('✅ Academic data seeded successfully.');
}
