import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { ResponseDto } from '@app/dto/response.dto';
import { SaveStudentDto } from '@app/dto/student.dto';
import { writeToConsole } from '@app/common/utils/writeToConsole';
import { Prisma } from 'libs/prisma/generated';
import { randomUUID } from 'crypto';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  async save(
    body: SaveStudentDto,
  ): Promise<ResponseDto<{ student_id: string } | null>> {
    try {
      const result = await this.prismaService.$transaction(async (prisma) => {
        let studentUser = await prisma.users.findFirst({
          where: { email: body.user.email },
        });
        if (!studentUser) {
          studentUser = await prisma.users.create({
            data: {
              user_id: randomUUID(),
              user_code: randomUUID(),
              name: body.user.name,
              email: body.user.email,
              phone: body.user.phone,
              status: 'active',
              created_at: new Date(),
              updated_at: new Date(),
              created_by: 'system',
              updated_by: 'system',
            },
          });
        } else {
          await prisma.users.update({
            where: { user_id: studentUser.user_id },
            data: {
              name: body.user.name,
              phone: body.user.phone,
              updated_at: new Date(),
              updated_by: 'system',
            },
          });
        }

        /** =========================
         * STUDENT PROFILE
         ========================== */
        let studentProfile = await prisma.student_profiles.findFirst({
          where: {
            user_id: studentUser.user_id,
            is_deleted: false,
          },
        });

        if (!studentProfile) {
          studentProfile = await prisma.student_profiles.create({
            data: {
              student_id: randomUUID(),
              user_id: studentUser.user_id,
              admission_no: body.student.admission_no,
              dob: body.student.dob,
              gender: body.student.gender,
              class_id: body.student.class_id,
              section_id: body.student.section_id,
              created_at: new Date(),
              updated_at: new Date(),
              created_by: 'system',
              updated_by: 'system',
            },
          });
        } else {
          await prisma.student_profiles.update({
            where: { student_id: studentProfile.student_id },
            data: {
              admission_no: body.student.admission_no,
              dob: body.student.dob,
              gender: body.student.gender,
              class_id: body.student.class_id,
              section_id: body.student.section_id,
              updated_at: new Date(),
              updated_by: 'system',
            },
          });
        }
        if (body.parent) {
          let parentUser = await prisma.users.findFirst({
            where: { email: body.parent.user.email },
          });

          if (!parentUser) {
            parentUser = await prisma.users.create({
              data: {
                user_id: randomUUID(),
                user_code: randomUUID(),
                name: body.parent.user.name,
                email: body.parent.user.email,
                phone: body.parent.user.phone,
                status: 'active',
                created_at: new Date(),
                updated_at: new Date(),
                created_by: 'system',
                updated_by: 'system',
              },
            });
          }

          let parentProfile = await prisma.parent_profiles.findFirst({
            where: {
              user_id: parentUser.user_id,
              is_deleted: false,
            },
          });

          if (!parentProfile) {
            parentProfile = await prisma.parent_profiles.create({
              data: {
                parent_id: randomUUID(),
                user_id: parentUser.user_id,
                occupation: body.parent.profile.occupation,
                relation_to_student: body.parent.profile.relation_to_student,
                annual_income: body.parent.profile.annual_income,
                created_at: new Date(),
                updated_at: new Date(),
                created_by: 'system',
                updated_by: 'system',
              },
            });
          }

          const existingMap = await prisma.student_parent_map.findFirst({
            where: {
              student_id: studentProfile.student_id,
              parent_id: parentProfile.parent_id,
              is_deleted: false,
            },
          });

          if (!existingMap) {
            await prisma.student_parent_map.create({
              data: {
                student_parent_map_id: randomUUID(),
                student_id: studentProfile.student_id,
                parent_id: parentProfile.parent_id,
                created_at: new Date(),
                updated_at: new Date(),
                created_by: 'system',
                updated_by: 'system',
              },
            });
          }
        }

        return studentProfile.student_id;
      });

      return {
        success: true,
        message: 'Student saved successfully',
        data: { student_id: result },
      };
    } catch (error) {
      writeToConsole.error(`Error saving student: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to save student',
        data: null,
      };
    }
  }

  async getAll(params: {
    page?: number;
    limit?: number;
  }): Promise<ResponseDto<any>> {
    const { page, limit } = params;
    if (!page || !limit) {
      const data = await this.prismaService.student_profiles.findMany({
        where: { is_deleted: false },
        orderBy: { created_at: 'desc' },
      });

      return {
        success: true,
        message: 'All students fetched',
        data,
      };
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prismaService.student_profiles.findMany({
        where: { is_deleted: false },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prismaService.student_profiles.count({
        where: { is_deleted: false },
      }),
    ]);

    return {
      success: true,
      message: 'Students fetched with pagination',
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
    const student = await this.prismaService.student_profiles.findFirst({
      where: {
        student_id: id,
        is_deleted: false,
      },
      include: {
        users: true,
        student_parent_map: {
          include: {
            parent_profiles: true,
          },
        },
      },
    });

    if (!student) {
      writeToConsole.error(`Error in getStudent`);
      return {
        success: false,
        message: 'No Student Available',
        data: '',
      };
    }
    return {
      success: true,
      message: 'Student fetched successfully',
      data: student,
    };
  }
  async softDelete(id: string): Promise<ResponseDto<null>> {
    const exists = await this.prismaService.student_profiles.findFirst({
      where: {
        student_id: id,
        is_deleted: false,
      },
    });

    if (!exists) {
      throw new NotFoundException('Student not found or already deleted');
    }

    await this.prismaService.student_profiles.update({
      where: {
        student_id: id,
      },
      data: {
        is_deleted: true,
        updated_at: new Date(),
      },
    });

    return {
      success: true,
      message: 'Student deleted successfully',
      data: null,
    };
  }
}
