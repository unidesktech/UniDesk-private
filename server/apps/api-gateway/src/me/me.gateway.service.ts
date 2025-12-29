import { PrismaService } from '@app/prisma';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SidebarService } from './sidebar.service';
import { AuthenticatedUser } from '@app/dto';
import { JsonObject } from 'libs/prisma/generated/runtime/client';
import { Track } from '@app/common/logger/track.decorator';

@Injectable()
export class MeService {
  constructor(
    private readonly prismaService: PrismaService,
    private sidebarService: SidebarService,
  ) {}

  @Track()
  async getSidebar(userId?: string, schoolId?: string) {
    return await this.sidebarService.getSidebar(userId, schoolId);
  }

  @Track()
  async getStoreValue(user?: AuthenticatedUser, schoolId?: string) {
    if (!user || !schoolId) {
      return new UnauthorizedException();
    }

    const user_role = await this.prismaService.user_roles.findFirst({
      where: { user_id: user.user_id },
    });

    if (!user_role) {
      return {
        success: false,
        message: 'User has no role assigned',
        data: null,
      };
    }

    const role = await this.prismaService.roles.findFirst({
      where: { role_id: user_role.role_id },
    });

    if (!role) {
      return {
        success: false,
        message: "Assigned role doesn't exist",
        data: null,
      };
    }

    if (user.school_id) {
      const school = await this.prismaService.schools.findFirst({
        where: { school_id: user.school_id },
        select: {
          school_id: true,
          school_code: true,
          name: true,
          address: true,
          config: true,
          is_active: true,
        },
      });

      if (!school) {
        return {
          success: false,
          message: "School doesn't exist",
          data: null,
        };
      }

      return {
        success: true,
        message: 'Store Value Fetched',
        data: {
          user: {
            user_id: user.user_id,
            user_code: user.user_code,
            name: user.name,
            email: user.email,
            profile_photo_url: user.profile_photo_url,
            role: role.name || 'User',
          },
          school: {
            code: school.school_code,
            school_id: school.school_id,
            name: school.name,
            address: school.address,
            logo_url:
              typeof school.config === 'object' && school.config !== null
                ? (school.config as JsonObject).logo_url
                : null,
            is_active: school.is_active,
          },
        },
      };
    }
  }
}
