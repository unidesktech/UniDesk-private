import { Track } from '@app/common/logger/track.decorator';
import { writeToConsole } from '@app/common/utils/writeToConsole';
import { ActivityLogPayload } from '@app/dto/activitylog.dto';
import { ResponseDto } from '@app/dto/response.dto';
import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ActivityLogService {
  constructor(private prisma: PrismaService) {}

  @Track()
  async save(body: ActivityLogPayload): Promise<ResponseDto<null>> {
    try {
      const data = {
        school_id: isUUID(body.school_id ?? '') ? body.school_id : null,
        user_id: isUUID(body.user_id ?? '') ? body.user_id : null,

        action_type: body.action_type,
        description: body.description,

        ip_address: body.ip_address ?? null,
        config: body.config ?? undefined,

        comments: body.comments ?? null,
        updated_at: new Date(),
        is_deleted: false,
      };

      await this.prisma.activity_logs.create({
        data: {
          ...data,
          activity_id: randomUUID(),
          created_at: new Date(),
        },
      });

      writeToConsole.log(
        `Activity logged: ${body.action_type}`,
      );

      return {
        success: true,
        message: 'Activity log created successfully',
        data: null,
      };
    } catch (error) {
      writeToConsole.error(
        `Error creating activity log: ${String(error)}`,
      );

      return {
        success: false,
        message: 'Error creating activity log',
        data: null,
      };
    }
  }

  @Track()
  async get(id?: string): Promise<ResponseDto<any[] | null>> {
    try {
      if (id) {
        const log = await this.prisma.activity_logs.findUnique({
          where: { activity_id: id },
        });

        if (!log) {
          return {
            success: false,
            message: 'Activity log not found',
            data: null,
          };
        }

        writeToConsole.log(`Fetched activity log ID: ${id}`);

        return {
          success: true,
          message: 'Activity log fetched successfully',
          data: [log],
        };
      }

      const logs = await this.prisma.activity_logs.findMany({
        where: { is_deleted: false },
        orderBy: { created_at: 'desc' },
      });

      writeToConsole.log(`Fetched ${logs.length} activity logs`);

      return {
        success: true,
        message: 'Activity logs fetched successfully',
        data: logs,
      };
    } catch (error) {
      writeToConsole.error(
        `Error fetching activity logs: ${String(error)}`,
      );

      return {
        success: false,
        message: 'Error fetching activity logs',
        data: null,
      };
    }
  }
}
