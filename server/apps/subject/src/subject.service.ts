import { writeToConsole } from '@app/common/utils/writeToConsole';
import { ResponseDto } from '@app/dto/response.dto';
import { saveSubjectDto } from '@app/dto/subject.dto';
import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubjectService {
  constructor(private readonly prismaService: PrismaService) {}
  // getHello(): string {
  //   return 'Hello World!';
  // }
  async save(
    body: saveSubjectDto,
    school_id: string,
    createdBy?: string,
  ): Promise<ResponseDto<{ subject_id: string } | null>> {
    try {
      const name = body.name.trim();
      const subject = await this.prismaService.subjects.upsert({
        where: body.subject_id
          ? { subject_id: body.subject_id }
          : {
              school_id_year_id_name: {
                school_id: school_id,
                year_id: body.year_id,
                name,
              },
            },

        update: {
          code: body.code,
          category: body.category,
          is_deleted: false,
          is_active: true,
          updated_by: createdBy,
        },

        create: {
          subject_id: crypto.randomUUID(),
          school_id: school_id,
          year_id: body.year_id,
          name,
          code: body.code,
          category: body.category,
          created_by: createdBy,
          updated_by: createdBy,
        },
      });

      return {
        success: true,
        message: body.subject_id
          ? 'Subject updated successfully'
          : 'Subject created successfully',
        data: {
          subject_id: subject.subject_id,
        },
      };
    } catch (error) {
      writeToConsole.error(`Error saving subject: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to save subject',
        data: null,
      };
    }
  }
  async getStats(schoolId: string) {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const [
      totalSubjects,
      activeSubjects,
      inactiveSubjects,
      newThisWeek,
      subjectsWithTeachers,
    ] = await this.prismaService.$transaction([
      this.prismaService.subjects.count({
        where: { is_deleted: false, school_id: schoolId },
      }),
      this.prismaService.subjects.count({
        where: { is_deleted: false, is_active: true, school_id: schoolId },
      }),
      this.prismaService.subjects.count({
        where: { is_deleted: false, is_active: false, school_id: schoolId },
      }),
      this.prismaService.subjects.count({
        where: {
          is_deleted: false,
          school_id: schoolId,
          created_at: { gte: startOfWeek },
        },
      }),
      this.prismaService.subjects.findMany({
        where: { is_deleted: false, school_id: schoolId },
        include: {
          class_subjects: {
            where: { is_deleted: false },
            include: {
              teacher_subjects: {
                where: { is_deleted: false },
                select: { teacher_id: true },
              },
            },
          },
        },
      }),
    ]);
    let totalTeachers = 0;
    subjectsWithTeachers.forEach((sub) => {
      const teacherSet = new Set<string>();
      sub.class_subjects.forEach((clsSub) => {
        clsSub.teacher_subjects.forEach((ts) => teacherSet.add(ts.teacher_id));
      });
      totalTeachers += teacherSet.size;
    });
    const avgTeachersPerSubject =
      subjectsWithTeachers.length > 0
        ? totalTeachers / subjectsWithTeachers.length
        : 0;

    return {
      data: {
        totalSubjects,
        activeSubjects,
        inactiveSubjects,
        newThisWeek,
        avgTeachersPerSubject: parseFloat(avgTeachersPerSubject.toFixed(2)),
      },
    };
  }

  async getAll(params: {
    page?: number;
    limit?: number;
    schoolId?: string;
    yearId?: string;
  }): Promise<ResponseDto<any>> {
    try {
      const { page, limit, schoolId, yearId } = params;

      const where: any = {
        is_deleted: false,
        ...(schoolId && { school_id: schoolId }),
        ...(yearId && { year_id: yearId }),
      };

      if (!page || !limit) {
        const data = await this.prismaService.subjects.findMany({
          where,
          orderBy: { created_at: 'desc' },
        });

        return { success: true, message: 'Subjects fetched', data };
      }

      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        this.prismaService.subjects.findMany({
          where,
          skip,
          take: limit,
          orderBy: { created_at: 'desc' },
        }),
        this.prismaService.subjects.count({ where }),
      ]);

      return {
        success: true,
        message: 'Subjects fetched with pagination',
        data: {
          data,
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      writeToConsole.error(`Error fetching subjects: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to fetch subjects',
        data: null,
      };
    }
  }
  async getById(id: string): Promise<ResponseDto<any>> {
    try {
      const subject = await this.prismaService.subjects.findFirst({
        where: {
          subject_id: id,
          is_deleted: false,
        },
        include: {
          class_subjects: {
            where: { is_deleted: false },
            include: {
              teacher_subjects: {
                where: { is_deleted: false },
              },
            },
          },
        },
      });

      if (!subject) {
        return { success: false, message: 'Subject not found', data: null };
      }

      return {
        success: true,
        message: 'Subject fetched successfully',
        data: subject,
      };
    } catch (error) {
      writeToConsole.error(`Error fetching subject: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to fetch subject',
        data: null,
      };
    }
  }
  async softDelete(
    subjectId: string,
    body: { reason: string },
    updatedBy?: string,
  ): Promise<ResponseDto<null>> {
    try {
      // const classSubjectCount = await this.prismaService.class_subjects.count({
      //   where: {
      //     subject_id: subjectId,
      //     is_deleted: false,
      //   },
      // });

      // if (classSubjectCount > 0) {
      //   return {
      //     success: false,
      //     message: 'Cannot delete subject. Subject is assigned to class(es).',
      //     data: null,
      //   };
      // }

      await this.prismaService.subjects.update({
        where: { subject_id: subjectId },
        data: {
          is_deleted: true,
          comments: body.reason,
          updated_by: updatedBy,
        },
      });

      return {
        success: true,
        message: 'Subject deleted successfully',
        data: null,
      };
    } catch (error) {
      writeToConsole.error(`Error deleteing subject: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to fetch subject',
        data: null,
      };
    }
  }
}
