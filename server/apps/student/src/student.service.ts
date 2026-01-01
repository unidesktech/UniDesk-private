import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseDto } from '@app/dto/response.dto';
import { SaveStudentDto } from '@app/dto/student.dto';
import { writeToConsole } from '@app/common/utils/writeToConsole';
import { uuidv7 } from 'uuidv7';
import { Track } from '@app/common/logger/track.decorator';
import { PrismaService } from '@app/prisma';
import bcrypt from 'bcryptjs';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  @Track()
  async save(
    body: SaveStudentDto,
    creator?: string,
    schoolId?: string,
  ): Promise<ResponseDto<{ student_id: string } | null>> {
    try {
      const studentId = await this.prismaService.$transaction(
        async (prisma) => {
          const plainPassword = body.student.password || body.student.name;
          const saltRounds = parseInt(process.env.SALT_ROUNDS ?? '10', 10);
          const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

          const studentUser = await prisma.users.upsert({
            where: { email: body.student.email },
            update: {
              name: body.student.name,
              phone: body.student.phone,
              profile_photo_url: body.student.avatar,
              password_hash: hashedPassword,
              updated_by: creator,
            },
            create: {
              user_id: uuidv7(),
              user_code: `STU-${Date.now()}`,
              school_id: schoolId,
              name: body.student.name,
              email: body.student.email,
              phone: body.student.phone,
              profile_photo_url: body.student.avatar,
              password_hash: hashedPassword,
              status: 'active',
              created_by: creator,
            },
          });
          const studentProfile = await prisma.student_profiles.upsert({
            where: { user_id: studentUser.user_id },
            update: {
              admission_no: body.student.admission_no,
              dob: body.student.dob,
              gender: body.student.gender,
              blood_group: body.student.blood_group,
              emergencyContactNo: body.student.emergencyContactNo,
              class_id: body.student.class_id,
              section_id: body.student.section_id,
              comments: body.student.comments,
              is_deleted: false,
              updated_by: creator,
            },
            create: {
              student_id: uuidv7(),
              user_id: studentUser.user_id,
              admission_no: body.student.admission_no,
              dob: body.student.dob,
              gender: body.student.gender,
              blood_group: body.student.blood_group,
              emergencyContactNo: body.student.emergencyContactNo,
              class_id: body.student.class_id,
              section_id: body.student.section_id,
              comments: body.student.comments,
              created_by: creator,
              updated_by: creator,
            },
          });

          if (body.parents?.length) {
            for (const parent of body.parents) {
              const parentUser = await prisma.users.upsert({
                where: { email: parent.email },
                update: {
                  name: parent.name,
                  phone: parent.phone,
                  profile_photo_url: parent.avatar,
                  password_hash: hashedPassword,
                  updated_by: creator,
                },
                create: {
                  user_id: uuidv7(),
                  user_code: `PARENT-${Date.now()}`,
                  name: parent.name,
                  email: parent.email,
                  phone: parent.phone,
                  profile_photo_url: parent.avatar,
                  password_hash: hashedPassword,
                  status: 'active',
                  created_by: creator,
                  updated_by: creator,
                },
              });
              const parentProfile = await prisma.parent_profiles.upsert({
                where: { user_id: parentUser.user_id },
                update: {
                  occupation: parent.occupation,
                  annual_income: parent.annual_income,
                  is_deleted: false,
                  relation_to_student: parent.relation,
                },
                create: {
                  parent_id: uuidv7(),
                  user_id: parentUser.user_id,
                  occupation: parent.occupation,
                  relation_to_student: parent.relation,
                  annual_income: parent.annual_income,
                  created_by: creator,
                  updated_by: creator,
                },
              });
              await prisma.student_parent_map.upsert({
                where: {
                  student_id_parent_id: {
                    student_id: studentProfile.student_id,
                    parent_id: parentProfile.parent_id,
                  },
                },
                update: {
                  is_deleted: false,
                  updated_by: creator,
                },
                create: {
                  student_parent_map_id: uuidv7(),
                  student_id: studentProfile.student_id,
                  parent_id: parentProfile.parent_id,
                  created_by: creator,
                  updated_by: creator,
                  comments: parent.relation,
                },
              });
            }
          }
          return studentProfile.student_id;
        },
      );

      return {
        success: true,
        message: 'Student saved successfully',
        data: { student_id: studentId },
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
  async getStats(schoolId: string) {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const baseWhere = {
      is_deleted: false,
      users: {
        school_id: schoolId,
        is_deleted: false,
      },
    };

    const [total, active, inactive, newThisWeek] = await Promise.all([
      this.prismaService.student_profiles.count({
        where: baseWhere,
      }),

      this.prismaService.student_profiles.count({
        where: {
          ...baseWhere,
          users: { ...baseWhere.users, status: 'active' },
        },
      }),

      this.prismaService.student_profiles.count({
        where: {
          ...baseWhere,
          users: { ...baseWhere.users, status: 'inactive' },
        },
      }),

      this.prismaService.student_profiles.count({
        where: {
          ...baseWhere,
          created_at: { gte: startOfWeek },
        },
      }),
    ]);

    return {
      success: true,
      message: 'Student stats fetched successfully',
      data: { total, active, inactive, newThisWeek },
    };
  }

  async getAll(params: {
    page?: number;
    limit?: number;
    schoolId?: string;
  }): Promise<ResponseDto<any>> {
    try {
      const { page = 1, limit, schoolId } = params;

      const whereClause = {
        is_deleted: false,
        ...(schoolId && {
          users: {
            school_id: schoolId,
            is_deleted: false,
          },
        }),
      };

      const selectClause = {
        student_id: true,
        section_id: true,
        users: {
          select: {
            user_code: true,
            name: true,
            phone: true,
            status: true,
          },
        },
        classes: {
          select: {
            name: true,
          },
        },
      };

      if (!limit) {
        const records = await this.prismaService.student_profiles.findMany({
          where: whereClause,
          orderBy: { created_at: 'desc' },
          select: selectClause,
        });

        const data = records.map((r) => ({
          user_code: r.users?.user_code,
          name: r.users?.name,
          class: r.classes?.name ?? '',
          contact: r.users?.phone,
          status: r.users?.status,
        }));

        return {
          success: true,
          message: 'All students fetched',
          data: {
            records: data,
            total: data.length,
          },
        };
      }

      const skip = (page - 1) * limit;

      const [records, total] = await Promise.all([
        this.prismaService.student_profiles.findMany({
          where: whereClause,
          skip,
          take: limit,
          orderBy: { created_at: 'desc' },
          select: selectClause,
        }),
        this.prismaService.student_profiles.count({
          where: whereClause,
        }),
      ]);

      const data = records.map((r) => ({
        user_code: r.users?.user_code,
        name: r.users?.name,
        class: r.classes?.name,
        contact: r.users?.phone,
        status: r.users?.status,
      }));

      return {
        success: true,
        message: 'Students fetched successfully',
        data: {
          data: data,
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      writeToConsole.error(`Error fetching students: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to fetch students',
        data: null,
      };
    }
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
  async softDelete(
    studentId: string,
    body: { reason: string },
    updatedBy?: string,
  ): Promise<ResponseDto<null>> {
    const student = await this.prismaService.student_profiles.findFirst({
      where: {
        student_id: studentId,
        is_deleted: false,
      },
      include: {
        users: true,
        student_parent_map: {
          where: { is_deleted: false },
          include: {
            parent_profiles: true,
          },
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found or already deleted');
    }

    await this.prismaService.$transaction(async (prisma) => {
      await prisma.student_profiles.update({
        where: { student_id: studentId },
        data: {
          is_deleted: true,
          comments: body.reason,
          updated_by: updatedBy,
        },
      });
      await prisma.users.update({
        where: { user_id: student.user_id },
        data: {
          is_deleted: true,
          comments: body.reason,
          updated_by: updatedBy,
        },
      });
      for (const map of student.student_parent_map) {
        const parentId = map.parent_id;
        const activeMappings = await prisma.student_parent_map.findMany({
          where: {
            parent_id: parentId,
            is_deleted: false,
            student_profiles: {
              is_deleted: false,
            },
          },
          select: { student_parent_map_id: true },
        });
        await prisma.student_parent_map.update({
          where: {
            student_parent_map_id: map.student_parent_map_id,
          },
          data: {
            is_deleted: true,
            updated_by: updatedBy,
          },
        });
        if (activeMappings.length === 1) {
          await prisma.parent_profiles.update({
            where: { parent_id: parentId },
            data: {
              is_deleted: true,
              comments: body.reason,
              updated_by: updatedBy,
            },
          });
          await prisma.users.update({
            where: { user_id: map.parent_profiles.user_id },
            data: {
              is_deleted: true,
              comments: body.reason,
              updated_by: updatedBy,
            },
          });
        }
      }
    });

    return {
      success: true,
      message: 'Student deleted successfully',
      data: null,
    };
  }
}
