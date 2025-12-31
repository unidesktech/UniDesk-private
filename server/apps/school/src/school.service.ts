import { Track } from '@app/common/logger/track.decorator';
import { sendEmail } from '@app/common/utils/Email';
import { getSchoolCreationEmailTemplate } from '@app/common/utils/templates/emails/School';
import { writeToConsole } from '@app/common/utils/writeToConsole';
import { ResponseDto } from '@app/dto/response.dto';
import {
  SchoolBasicInfoDTO,
  SchoolBrandingDTO,
  SchoolPreview,
} from '@app/dto/school.dto';
import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class SchoolService {
  constructor(private prismaService: PrismaService) {}

  @Track()
  async save(body: {
    name: string;
    short_name?: string;
    address: string;
    email: string;
    phone: string;
    website?: string;
    established?: Date;
    config?: object;
    logo_url?: string;
    banner_url?: string;
  }): Promise<ResponseDto<SchoolBasicInfoDTO | null>> {
    const {
      name,
      short_name,
      address,
      email,
      phone,
      website,
      established,
      config,
      logo_url,
      banner_url,
    } = body;

    try {
      const existing = await this.prismaService.schools.findFirst({
        where: {
          OR: [{ name }, { email }],
        },
      });

      if (existing) {
        return {
          success: false,
          message: 'School with the same name or email already exists',
          data: null,
        };
      }

      const school = await this.prismaService.$transaction(async (prisma) => {
        const school = await prisma.schools.create({
          data: {
            school_id: uuidv7(),
            school_code: this.getSchoolCode(name, short_name),
            name,
            address,
            email,
            phone,
            website,
            established: established ? new Date(established) : new Date(),
            config: config ?? {},
            created_at: new Date(),
            updated_at: new Date(),
            created_by: 'system',
            updated_by: 'system',
          },
        });

        await prisma.school_branding.create({
          data: {
            branding_id: uuidv7(),
            school_id: school.school_id,
            logo_url: logo_url || null,
            banner_url: banner_url || null,
            created_at: new Date(),
            updated_at: new Date(),
            created_by: 'system',
            updated_by: 'system',
          },
        });

        await prisma.school_subscription_status.create({
          data: {
            status_id: uuidv7(),
            school_id: school.school_id,
            created_at: new Date(),
            updated_at: new Date(),
            status: 'inactive',
            valid_from: new Date(),
            valid_to: new Date(),
            created_by: 'system',
            updated_by: 'system',
          },
        });

        await prisma.school_pricing_plans.create({
          data: {
            plan_id: uuidv7(),
            school_id: school.school_id,
            created_at: new Date(),
            updated_at: new Date(),
            plan_type: 'free',
            price_per_month: 0,
            billing_cycle: 'monthly',
            valid_from: new Date(),
            valid_to: new Date(),
            created_by: 'system',
            updated_by: 'system',
          },
        });

        await prisma.school_initial_setup.create({
          data: {
            setup_id: uuidv7(),
            school_id: school.school_id,
            created_at: new Date(),
            updated_at: new Date(),
            created_by: 'system',
            updated_by: 'system',
          },
        });

        await prisma.school_settings.create({
          data: {
            setting_id: uuidv7(),
            school_id: school.school_id,
            created_at: new Date(),
            updated_at: new Date(),
            created_by: 'system',
            updated_by: 'system',
          },
        });

        return school;
      });

      await sendEmail(
        email,
        'Welcome to UniDesk , Your school has been created.',
        getSchoolCreationEmailTemplate(
          name,
          email,
          phone,
          address,
          school.school_code,
          website,
          established,
          logo_url,
          banner_url,
        ),
      );
      return {
        success: true,
        message: 'School created successfully',
        data: school,
      };
    } catch (err) {
      writeToConsole.error(`Error Creating School: ${String(err)}`);
      return {
        success: false,
        message: 'Error creating school',
        data: null,
      };
    }
  }

  @Track()
  async getSchoolInfo(
    id?: string,
  ): Promise<ResponseDto<Partial<SchoolBasicInfoDTO> | null>> {
    let schoolInfo = null;
    try {
      if (id) {
        const school = await this.prismaService.schools.findUnique({
          where: { school_id: id },
        });

        const subscriptions =
          await this.prismaService.school_subscription_status.findMany({
            where: { school_id: id },
          });

        const pricing = await this.prismaService.school_pricing_plans.findMany({
          where: { school_id: id },
        });

        const branding = await this.prismaService.school_branding.findUnique({
          where: { school_id: id },
        });

        schoolInfo = this.mapSchoolData(
          school,
          subscriptions,
          pricing,
          branding,
        );
      }
      return {
        success: true,
        message: 'School details fetched successfully',
        data: schoolInfo,
      };
    } catch (err) {
      writeToConsole.error(`Error fetching school details: ${String(err)}`);

      return {
        success: false,
        message: 'Error fetching school details',
        data: null,
      };
    }
  }

  @Track()
  async validateSchoolCode(
    code: string,
  ): Promise<ResponseDto<SchoolPreview | null> | null> {
    try {
      if (!code) {
        return {
          success: false,
          message: 'Please enter a code',
          data: null,
        };
      }

      const school = await this.prismaService.schools.findUnique({
        where: { school_code: code },
      });

      if (!school) {
        return {
          success: false,
          message: 'Invalid school code. Please try again.',
          data: null,
        };
      }

      if (!school.is_active) {
        return {
          success: false,
          message:
            'This school portal is disabled. Please contact your school admin.',
          data: null,
        };
      }

      const schoolBranding = await this.prismaService.school_branding.findFirst(
        {
          where: { school_id: school.school_id },
        },
      );

      const previewData: SchoolPreview = {
        school_id: school.school_id,
        name: school.name,
        address: school.address ?? '',
        logo_url: schoolBranding?.logo_url ?? '',
        is_active: school.is_active,
      };

      return {
        success: true,
        message: 'School details fetched successfully',
        data: previewData,
      };
    } catch (err) {
      writeToConsole.error(`Error validating school code: ${String(err)}`);

      return {
        success: false,
        message: 'Error validating school code',
        data: null,
      };
    }
  }

  mapSchoolData(
    school: Partial<SchoolBasicInfoDTO> | null,
    subscriptions:
      | {
          status: string;
          valid_from: Date | null;
          valid_to: Date | null;
        }[]
      | null,
    pricing:
      | {
          plan_type: string;
          price_per_month: number | null;
          billing_cycle: string | null;
        }[]
      | null,
    branding: Partial<SchoolBrandingDTO> | null,
  ): Partial<SchoolBasicInfoDTO> | null {
    if (!school) return null;

    const schoolInfo: Partial<SchoolBasicInfoDTO> = {
      school_id: school.school_id,
      name: school.name,
      address: school.address,
      email: school.email,
      phone: school.phone,
      website: school.website,
      established: school.established,
      config: school.config,
      is_active: school.is_active,
      created_at: school.created_at,
      updated_at: school.updated_at,
    };

    if (subscriptions && subscriptions.length > 0) {
      schoolInfo.subscription = {
        status: subscriptions[0]?.status || null,
        valid_from: subscriptions[0]?.valid_from || null,
        valid_to: subscriptions[0]?.valid_to || null,
      };
    }

    if (pricing && pricing.length > 0) {
      schoolInfo.subscription = {
        ...schoolInfo.subscription,
        plan_type: pricing[0]?.plan_type || null,
        price_per_month: pricing[0]?.price_per_month,
        billing_cycle: pricing[0]?.billing_cycle || null,
      };
    }

    if (branding) {
      schoolInfo.school_branding = {
        logo_url: branding.logo_url || null,
        banner_url: branding.banner_url || null,
        primary_color: branding.primary_color || null,
        secondary_color: branding.secondary_color || null,
        ascent_color: branding.ascent_color || null,
        theme_mode: branding.theme_mode || null,
        login_screen_config: branding.login_screen_config || null,
        header_footer_config: branding.header_footer_config || null,
      };
    }
    return schoolInfo;
  }

  getSchoolCode(name: string, short_name?: string): string {
    const randomNumber = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

    if (short_name) {
      return short_name.toUpperCase() + randomNumber;
    }

    const code = name
      .toUpperCase()
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .slice(0, 4);

    return code + randomNumber;
  }
}
