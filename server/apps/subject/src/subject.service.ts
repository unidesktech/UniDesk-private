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
    school_id?: string,
    createdBy?: string,
  ): Promise<ResponseDto<{ subject_id: string }>> {
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
  }
  async getAll(params: {
    page?: number;
    limit?: number;
    schoolId?: string;
    yearId?: string;
  }): Promise<ResponseDto<any>> {
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
  }
  async getById(id: string): Promise<ResponseDto<any>> {
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
  }
  async softDelete(
    subjectId: string,
    body: { reason: string },
    updatedBy?: string,
  ): Promise<ResponseDto<null>> {
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
  }
}
