import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { ResponseDto } from '@app/dto/response.dto';
import { writeToConsole } from '@app/common/utils/writeToConsole';
import { Track } from '@app/common/logger/track.decorator';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class SectionsService {
  constructor(private readonly prismaService: PrismaService) {}

  @Track()
  async save(
    body: any,
    creator?: string,
    // schoolId?: string,
  ): Promise<ResponseDto<{ section_id: string } | null>> {
    try {
      const sectionId = await this.prismaService.$transaction(
        async (prisma) => {
          // validate class
          const cls = await prisma.classes.findFirst({
            where: {
              class_id: body.section.class_id,
              is_deleted: false,
            },
          });

          if (!cls) {
            throw new NotFoundException('Class not found');
          }

          const section = await prisma.sections.upsert({
            where: {
              section_id: body.section?.section_id ?? '',
            },
            update: {
              name: body.section.name,
              class_id: body.section.class_id,
              is_active: body.section.is_active,
              updated_by: creator,
            },
            create: {
              section_id: uuidv7(),
              name: body.section.name,
              class_id: body.section.class_id,
              is_active: body.section.is_active ?? true,
              created_by: creator,
              updated_by: creator,
            },
          });

          return section.section_id;
        },
      );

      return {
        success: true,
        message: 'Section saved successfully',
        data: { section_id: sectionId },
      };
    } catch (error) {
      writeToConsole.error(`Error saving section: ${String(error)}`);
      return {
        success: false,
        message: 'Failed to save section',
        data: null,
      };
    }
  }

  async getAll(params: {
    page?: number;
    limit?: number;
    schoolId?: string;
  }): Promise<ResponseDto<any>> {
    const { schoolId } = params;

    const data = await this.prismaService.sections.findMany({
      where: {
        is_deleted: false,
        ...(schoolId && { classes: { school_id: schoolId } }),
      },
      include: { classes: true },
      orderBy: { created_at: 'desc' },
    });

    return {
      success: true,
      message: 'Sections fetched successfully',
      data: { records: data, total: data.length },
    };
  }

  async getById(id: string): Promise<ResponseDto<any>> {
    const section = await this.prismaService.sections.findFirst({
      where: { section_id: id, is_deleted: false },
      include: { classes: true },
    });

    if (!section) {
      return { success: false, message: 'Section not found', data: null };
    }

    return {
      success: true,
      message: 'Section fetched successfully',
      data: section,
    };
  }

  async softDelete(
    id: string,
    body: { reason: string },
    updatedBy?: string,
  ): Promise<ResponseDto<null>> {
    const exists = await this.prismaService.sections.findFirst({
      where: { section_id: id, is_deleted: false },
    });

    if (!exists) {
      throw new NotFoundException('Section not found or already deleted');
    }

    await this.prismaService.sections.update({
      where: { section_id: id },
      data: {
        is_deleted: true,
        comments: body.reason,
        updated_at: new Date(),
        updated_by: updatedBy,
      },
    });

    return {
      success: true,
      message: 'Section deleted successfully',
      data: null,
    };
  }
}
