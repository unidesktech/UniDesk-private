import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { SidebarService } from './sidebar.service';

@Injectable()
export class MeService {
  constructor(
    private readonly prisma: PrismaService,
    private sidebarService: SidebarService,
  ) {}

  async getSidebar(userId: string, schoolId: string) {
    return await this.sidebarService.getSidebar(userId, schoolId);
  }
}
