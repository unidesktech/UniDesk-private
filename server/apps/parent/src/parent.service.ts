import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';

import { Track } from '@app/common/logger/track.decorator';
import { ResponseDto } from '@app/dto/response.dto';
import { PrismaService } from '@app/prisma';
import { SaveParentDto } from '@app/dto/parent.dto';
import { writeToConsole } from '@app/common/utils/writeToConsole';

@Injectable()
export class ParentService {
  constructor(private readonly prismaService: PrismaService) {}

  @Track()
  async save(
    body: SaveParentDto,
    creator?: string,
    schoolId?: string,
  ): Promise<ResponseDto<{ parent_id: string } | null>> {
    try {
      const parentId = await this.prismaService.$transaction(async (prisma) => {
        const plainPassword = body.password ?? body.name;
        const saltRounds = Number(process.env.SALT_ROUNDS ?? 10);
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        const parentUser = await prisma.users.upsert({
          where: { email: body.email },
          update: {
            name: body.name,
            phone: body.phone,
            profile_photo_url: body.avatar,
            password_hash: hashedPassword,
            updated_by: creator,
          },
          create: {
            user_id: randomUUID(),
            user_code: `PARENT-${Date.now()}`,
            school_id: schoolId,
            name: body.name,
            email: body.email,
            phone: body.phone,
            profile_photo_url: body.avatar,
            password_hash: hashedPassword,
            status: 'active',
            created_by: creator,
            updated_by: creator,
          },
        });
        const parentProfile = await prisma.parent_profiles.upsert({
          where: { user_id: parentUser.user_id },
          update: {
            occupation: body.occupation,
            annual_income: body.annual_income,
            is_deleted: false,
            updated_by: creator,
          },
          create: {
            parent_id: randomUUID(),
            user_id: parentUser.user_id,
            occupation: body.occupation,
            annual_income: body.annual_income,
            created_by: creator,
            updated_by: creator,
          },
        });
        await prisma.student_parent_map.upsert({
          where: {
            student_id_parent_id: {
              student_id: body.student_id,
              parent_id: parentProfile.parent_id,
            },
          },
          update: {
            is_deleted: false,
            updated_by: creator,
          },
          create: {
            student_parent_map_id: randomUUID(),
            student_id: body.student_id,
            parent_id: parentProfile.parent_id,
            comments: body.relation,
            created_by: creator,
            updated_by: creator,
          },
        });

        return parentProfile.parent_id;
      });

      return {
        success: true,
        message: 'Parent saved successfully',
        data: { parent_id: parentId },
      };
    } catch (error) {
      writeToConsole.error(`Error saving parent: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to save parent',
        data: null,
      };
    }
  }
  async getStats(schoolId: string) {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const [totalParents, activeParents, inactiveParents, newThisWeek] =
      await this.prismaService.$transaction([
        this.prismaService.parent_profiles.count({
          where: {
            is_deleted: false,
            users: { school_id: schoolId, is_deleted: false },
          },
        }),
        this.prismaService.parent_profiles.count({
          where: {
            is_deleted: false,
            users: { school_id: schoolId, status: 'active', is_deleted: false },
          },
        }),
        this.prismaService.parent_profiles.count({
          where: {
            is_deleted: false,
            users: {
              school_id: schoolId,
              status: 'inactive',
              is_deleted: false,
            },
          },
        }),
        this.prismaService.parent_profiles.count({
          where: {
            is_deleted: false,
            created_at: { gte: startOfWeek },
            users: { school_id: schoolId, is_deleted: false },
          },
        }),
      ]);

    return {
      totalParents,
      activeParents,
      inactiveParents,
      newThisWeek,
    };
  }

  async getAll(params: { page?: number; limit?: number; schoolId?: string }) {
    const page = params.page ?? 1;
    const limit = params.limit;
    const schoolId = params.schoolId;
    if (!limit) {
      const records = await this.prismaService.parent_profiles.findMany({
        where: {
          is_deleted: false,
          ...(schoolId && {
            users: {
              school_id: schoolId,
              is_deleted: false,
            },
          }),
        },
        include: {
          users: true,
          student_parent_map: true,
        },
        orderBy: { created_at: 'desc' },
      });

      return {
        success: true,
        message: 'Parents fetched successfully',
        data: {
          records,
          total: records.length,
        },
      };
    }
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      this.prismaService.parent_profiles.findMany({
        where: {
          is_deleted: false,
          ...(schoolId && {
            users: {
              school_id: schoolId,
              is_deleted: false,
            },
          }),
        },
        skip,
        take: limit,
        include: {
          users: true,
          student_parent_map: true,
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prismaService.parent_profiles.count({
        where: {
          is_deleted: false,
          ...(schoolId && {
            users: {
              school_id: schoolId,
              is_deleted: false,
            },
          }),
        },
      }),
    ]);

    return {
      success: true,
      message: 'Parents fetched successfully',
      data: {
        records,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(parentId: string) {
    const parent = await this.prismaService.parent_profiles.findFirst({
      where: {
        parent_id: parentId,
        is_deleted: false,
      },
      include: {
        users: true,
        student_parent_map: {
          include: {
            student_profiles: true,
          },
        },
      },
    });

    if (!parent) {
      return {
        success: false,
        message: 'Parent not found',
      };
    }

    return {
      success: true,
      message: 'Parent fetched successfully',
      data: parent,
    };
  }
  async softDelete(
    parentId: string,
    body: { reason: string },
    updatedBy?: string,
  ): Promise<ResponseDto<null>> {
    const parent = await this.prismaService.parent_profiles.findFirst({
      where: {
        parent_id: parentId,
        is_deleted: false,
      },
      include: {
        student_parent_map: {
          where: {
            is_deleted: false,
            student_profiles: {
              is_deleted: false,
            },
          },
        },
      },
    });

    if (!parent) {
      return {
        success: false,
        message: 'Parent not found or already deleted',
        data: null,
      };
    }
    if (parent.student_parent_map.length > 0) {
      return {
        success: false,
        message: 'Cannot delete parent. Parent is linked to active student(s).',
        data: null,
      };
    }

    await this.prismaService.$transaction(async (prisma) => {
      await prisma.parent_profiles.update({
        where: { parent_id: parentId },
        data: {
          is_deleted: true,
          comments: body.reason,
          updated_by: updatedBy,
        },
      });

      await prisma.users.update({
        where: { user_id: parent.user_id },
        data: {
          is_deleted: true,
          comments: body.reason,
          updated_by: updatedBy,
        },
      });

      await prisma.student_parent_map.updateMany({
        where: {
          parent_id: parentId,
          is_deleted: false,
        },
        data: {
          is_deleted: true,
          updated_by: updatedBy,
        },
      });
    });

    return {
      success: true,
      message: 'Parent deleted successfully',
      data: null,
    };
  }
}
