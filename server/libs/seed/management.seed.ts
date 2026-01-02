import { uuidv7 } from 'uuidv7';
import {
  SCHOOL_ID,
  TEACHER_USER_ID,
  STUDENT_USER_ID,
  PARENT_USER_ID,
} from './constants';
import { prisma } from './prisma.client';

export async function seedAcademicData() {
  console.log('🌱 Seeding management...');
  await prisma.$transaction(async (tx) => {
    let academicYear = await tx.academic_years.findFirst({
      where: { school_id: SCHOOL_ID, name: '2024-2025' },
    });

    if (!academicYear) {
      academicYear = await tx.academic_years.create({
        data: {
          year_id: uuidv7(),
          school_id: SCHOOL_ID,
          name: '2024-2025',
          start_date: new Date('2024-04-01'),
          end_date: new Date('2025-03-31'),
        },
      });
    }

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

    let class10 = await tx.classes.findFirst({
      where: {
        school_id: SCHOOL_ID,
        year_id: academicYear.year_id,
        name: 'Class 10',
      },
    });

    if (!class10) {
      class10 = await tx.classes.create({
        data: {
          class_id: uuidv7(),
          school_id: SCHOOL_ID,
          year_id: academicYear.year_id,
          name: 'Class 10',
        },
      });
    }

    let sectionA = await tx.sections.findFirst({
      where: { class_id: class10.class_id, name: 'A' },
    });

    if (!sectionA) {
      sectionA = await tx.sections.create({
        data: {
          section_id: uuidv7(),
          class_id: class10.class_id,
          name: 'A',
        },
      });
    }

    let math = await tx.subjects.findFirst({
      where: {
        school_id: SCHOOL_ID,
        year_id: academicYear.year_id,
        name: 'Mathematics',
      },
    });

    if (!math) {
      math = await tx.subjects.create({
        data: {
          subject_id: uuidv7(),
          school_id: SCHOOL_ID,
          year_id: academicYear.year_id,
          name: 'Mathematics',
          code: 'MATH-10',
          category: 'Core',
        },
      });
    }

    let classMath = await tx.class_subjects.findFirst({
      where: {
        class_id: class10.class_id,
        subject_id: math.subject_id,
      },
    });

    if (!classMath) {
      classMath = await tx.class_subjects.create({
        data: {
          class_subject_id: uuidv7(),
          class_id: class10.class_id,
          subject_id: math.subject_id,
        },
      });
    }

    let teacher = await tx.teacher_profiles.findFirst({
      where: { user_id: TEACHER_USER_ID },
    });

    if (!teacher) {
      teacher = await tx.teacher_profiles.create({
        data: {
          teacher_id: uuidv7(),
          user_id: TEACHER_USER_ID,
          employee_code: 'EMP1001',
          qualification: 'M.Sc Mathematics',
          joining_date: new Date('2021-06-01'),
          experience_in_years: 8,
        },
      });
    }

    let student = await tx.student_profiles.findFirst({
      where: { user_id: STUDENT_USER_ID },
    });

    if (!student) {
      student = await tx.student_profiles.create({
        data: {
          student_id: uuidv7(),
          user_id: STUDENT_USER_ID,
          admission_no: 'ADM2024001',
          dob: new Date('2010-08-15'),
          gender: 'Male',
          class_id: class10.class_id,
          section_id: sectionA.section_id,
        },
      });
    }

    let parent = await tx.parent_profiles.findFirst({
      where: { user_id: PARENT_USER_ID },
    });

    if (!parent) {
      parent = await tx.parent_profiles.create({
        data: {
          parent_id: uuidv7(),
          user_id: PARENT_USER_ID,
          occupation: 'Business',
          relation_to_student: 'Father',
          annual_income: 850000,
        },
      });
    }

    const mapping = await tx.student_parent_map.findFirst({
      where: {
        student_id: student.student_id,
        parent_id: parent.parent_id,
      },
    });

    if (!mapping) {
      await tx.student_parent_map.create({
        data: {
          student_parent_map_id: uuidv7(),
          student_id: student.student_id,
          parent_id: parent.parent_id,
        },
      });
    }
  });
  console.log('✅ Management seeded');
}
