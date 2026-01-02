import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseDto } from '@app/dto/response.dto';
import { writeToConsole } from '@app/common/utils/writeToConsole';
import { PrismaService } from '@app/prisma';
import { uuidv7 } from 'uuidv7';
import { Track } from '@app/common/logger/track.decorator';
import bcrypt from 'bcryptjs';
import { SaveTeacherDTO } from '@app/dto/teacher.dto';

@Injectable()
export class TeacherService {
  constructor(private readonly prismaService: PrismaService) {}

  @Track()
  async save(
    body: SaveTeacherDTO,
    creator?: string,
    schoolId?: string,
  ): Promise<ResponseDto<{ teacher_id: string } | null>> {
    try {
      const teacherId = await this.prismaService.$transaction(
        async (prisma) => {
          const plainPassword = body.password || body.name;
          const saltRounds = parseInt(process.env.SALT_ROUNDS ?? '10', 10);
          const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

          const user = await prisma.users.upsert({
            where: { email: body.email },
            update: {
              name: body.name,
              phone: body.phone,
              profile_photo_url: body.avatar,
              password_hash: hashedPassword,
              updated_by: creator,
            },
            create: {
              user_id: uuidv7(),
              user_code: `TEACH-${Date.now()}`,
              school_id: schoolId,
              name: body.name,
              email: body.email,
              phone: body.phone,
              profile_photo_url: body.avatar,
              password_hash: hashedPassword,
              status: 'active',
              created_by: creator,
            },
          });

          const profile = await prisma.teacher_profiles.upsert({
            where: { user_id: user.user_id },
            update: {
              qualification: body.qualification,
              experience_in_years: body.experienceYears,
              joining_date: body.joiningDate,
              is_deleted: false,
              updated_by: creator,
            },
            create: {
              teacher_id: uuidv7(),
              user_id: user.user_id,
              qualification: body.qualification,
              joining_date: body.joiningDate,
              created_by: creator,
              updated_by: creator,
            },
          });

          return profile.teacher_id;
        },
      );

      return {
        success: true,
        message: 'Teacher saved successfully',
        data: { teacher_id: teacherId },
      };
    } catch (error) {
      writeToConsole.error(`Error saving teacher: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to save teacher',
        data: null,
      };
    }
  }

  async getStats(schoolId: string) {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [total, active, onLeave, newThisMonth] = await Promise.all([
      this.prismaService.teacher_profiles.count({
        where: {
          is_deleted: false,
          users: {
            school_id: schoolId,
            is_deleted: false,
          },
        },
      }),

      this.prismaService.teacher_profiles.count({
        where: {
          is_deleted: false,
          users: {
            school_id: schoolId,
            status: 'active',
            is_deleted: false,
          },
        },
      }),
      this.prismaService.teacher_profiles.count({
        where: {
          is_deleted: false,
          users: {
            school_id: schoolId,
            status: 'on_leave',
            is_deleted: false,
          },
        },
      }),
      this.prismaService.teacher_profiles.count({
        where: {
          is_deleted: false,
          created_at: { gte: startOfMonth },
          users: {
            school_id: schoolId,
            is_deleted: false,
          },
        },
      }),
    ]);

    return {
      data: { total, active, onLeave, newThisMonth },
    };
  }

  async getAll(params: {
    page?: number;
    limit?: number;
    schoolId?: string;
  }): Promise<ResponseDto<any>> {
    const { page = 1, limit, schoolId } = params;

    const where = {
      is_deleted: false,
      ...(schoolId && {
        users: {
          school_id: schoolId,
          is_deleted: false,
        },
      }),
    };

    if (!limit) {
      const data = await this.prismaService.teacher_profiles.findMany({
        where,
        include: { users: true },
        orderBy: { created_at: 'desc' },
      });

      return {
        success: true,
        message: 'All teachers fetched',
        data: { records: data, total: data.length },
      };
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prismaService.teacher_profiles.findMany({
        where,
        include: { users: true },
        skip,
        take: limit,
      }),
      this.prismaService.teacher_profiles.count({ where }),
    ]);

    return {
      success: true,
      message: 'Teachers fetched successfully',
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
    const teacher = await this.prismaService.teacher_profiles.findFirst({
      where: { teacher_id: id, is_deleted: false },
      include: { users: true },
    });

    if (!teacher) {
      return {
        success: false,
        message: 'Teacher not found',
        data: null,
      };
    }

    return {
      success: true,
      message: 'Teacher fetched successfully',
      data: teacher,
    };
  }

  async softDelete(
    id: string,
    body: { reason: string },
  ): Promise<ResponseDto<null>> {
    const exists = await this.prismaService.teacher_profiles.findFirst({
      where: { teacher_id: id, is_deleted: false },
    });

    if (!exists) {
      throw new NotFoundException('Teacher not found or already deleted');
    }

    await this.prismaService.teacher_profiles.update({
      where: { teacher_id: id },
      data: {
        is_deleted: true,
        comments: body.reason,
        updated_at: new Date(),
      },
    });

    return {
      success: true,
      message: 'Teacher deleted successfully',
      data: null,
    };
  }
}
