import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { ResponseDto } from '@app/dto/response.dto';
import { writeToConsole } from '@app/common/utils/writeToConsole';
import { randomUUID } from 'crypto';
import { Track } from '@app/common/logger/track.decorator';

@Injectable()
export class ClassesService {
  constructor(private readonly prismaService: PrismaService) {}

  @Track()
  async save(
    body: any,
    creator?: string,
    schoolId?: string,
  ): Promise<ResponseDto<{ class_id: string } | null>> {
    try {
      const classId = await this.prismaService.$transaction(async (prisma) => {
        const cls = await prisma.classes.upsert({
          where: {
            class_id: body.classes?.class_id ?? '',
          },
          update: {
            name: body.classes.name,
            comments: body.classes.comments,
            is_active: body.classes.is_active,
            updated_by: creator,
          },
          create: {
            class_id: randomUUID(),
            school_id: schoolId!,
            year_id: body.classes.year_id,
            name: body.classes.name,
            comments: body.classes.comments,
            is_active: body.classes.is_active ?? true,
            created_by: creator,
            updated_by: creator,
          },
        });

       
        if (Array.isArray(body.sections)) {
          await prisma.sections.updateMany({
            where: {
              class_id: cls.class_id,
              section_id: { notIn: body.sections },
            },
            data: {
              is_deleted: true,
              updated_by: creator,
            },
          });

        
          await prisma.sections.updateMany({
            where: {
              section_id: { in: body.sections },
            },
            data: {
              class_id: cls.class_id,
              updated_by: creator,
            },
          });
        }

        return cls.class_id;
      });

      return {
        success: true,
        message: 'Class saved successfully',
        data: { class_id: classId },
      };
    } catch (error) {
      writeToConsole.error(`Error saving class: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to save class',
        data: null,
      };
    }
  }

  async getAll(params: {
    page?: number;
    limit?: number;
    schoolId?: string;
  }): Promise<ResponseDto<any>> {
    const { page = 1, limit, schoolId } = params;

    const where = {
      is_deleted: false,
      ...(schoolId && { school_id: schoolId }),
    };

    const data = await this.prismaService.classes.findMany({
      where,
      include: { sections: true },
      orderBy: { created_at: 'desc' },
    });

    return {
      success: true,
      message: 'Classes fetched successfully',
      data: { records: data, total: data.length },
    };
  }

  async getById(id: string): Promise<ResponseDto<any>> {
    const cls = await this.prismaService.classes.findFirst({
      where: { class_id: id, is_deleted: false },
      include: { sections: true },
    });

    if (!cls) {
      return { success: false, message: 'Class not found', data: null };
    }

    return { success: true, message: 'Class fetched successfully', data: cls };
  }

  
  async softDelete(
    id: string,
    body: { reason: string },
  ): Promise<ResponseDto<null>> {
    const exists = await this.prismaService.classes.findFirst({
      where: { class_id: id, is_deleted: false },
    });

    if (!exists) {
      throw new NotFoundException('Class not found or already deleted');
    }

    await this.prismaService.$transaction(async (prisma) => {
  
      await prisma.sections.updateMany({
        where: { class_id: id, is_deleted: false },
        data: {
          is_deleted: true,
          comments: `Deleted due to class deletion: ${body.reason}`,
          updated_at: new Date(),
        },
      });

      
      await prisma.classes.update({
        where: { class_id: id },
        data: {
          is_deleted: true,
          comments: body.reason,
          updated_at: new Date(),
        },
      });
    });

    return {
      success: true,
      message: 'Class and related sections deleted successfully',
      data: null,
    };
  }
}
