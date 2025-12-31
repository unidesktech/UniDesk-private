import { Track } from '@app/common/logger/track.decorator';
import { combineDateAndTime } from '@app/common/utils/FormatFunctions';
import { writeToConsole } from '@app/common/utils/writeToConsole';
import { RequestDemoDTO } from '@app/dto/request-demo.dto';
import { ResponseDto } from '@app/dto/response.dto';
import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';
import { validate as isUUID } from 'uuid';

@Injectable()
export class RequestDemoService {
  constructor(private prisma: PrismaService) {}

  @Track()
  async save(body: RequestDemoDTO, id?: string): Promise<ResponseDto<null>> {
    try {
      const scheduled_demo_at = combineDateAndTime(
        body.scheduled_date,
        body.scheduled_time,
      );

      const data = {
        school_id: isUUID(body.school_id ?? '') ? body.school_id : null,
        organization: body.organization,
        organization_size: body.organization_size,
        full_name: body.full_name,
        contact_email: body.contact_email,
        contact_phone: body.contact_phone ?? null,
        country: body.country ?? null,
        city: body.city ?? null,
        message: body.message ?? null,
        source: body.source ?? null,
        status: body.status ?? 'new',
        comments: body.comments ?? null,
        scheduled_demo_at,
        updated_at: new Date(),
        is_active: body.is_active ?? true,
        is_deleted: body.is_deleted ?? false,
      };

      if (!id) {
        await this.prisma.demo_requests.create({
          data: {
            ...data,
            created_at: new Date(),
            request_id: uuidv7(),
          },
        });

        return {
          success: true,
          message: 'Demo request created successfully',
          data: null,
        };
      }

      await this.prisma.demo_requests.update({
        where: { request_id: id },
        data,
      });

      return {
        success: true,
        message: 'Demo request updated successfully',
        data: null,
      };
    } catch (error) {
      writeToConsole.error(`Error saving demo request: ${String(error)}`);
      return {
        success: false,
        message: 'Error saving demo request',
        data: null,
      };
    }
  }

  @Track()
  async get(id?: string): Promise<ResponseDto<any[] | null>> {
    try {
      if (id) {
        const demo = await this.prisma.demo_requests.findUnique({
          where: { request_id: id },
        });

        if (!demo) {
          return {
            success: false,
            message: 'Demo request not found',
            data: null,
          };
        }

        writeToConsole.log(`Fetched demo request with ID: ${id}`);

        return {
          success: true,
          message: 'Demo request fetched successfully',
          data: [demo],
        };
      }

      const demoList = await this.prisma.demo_requests.findMany();

      writeToConsole.log(`Fetched ${demoList.length} demo requests`);

      return {
        success: true,
        message: 'Demo requests fetched successfully',
        data: demoList,
      };
    } catch (error) {
      writeToConsole.error(`Error fetching demo requests: ${String(error)}`);

      return {
        success: false,
        message: 'Error fetching demo requests',
        data: null,
      };
    }
  }
}
