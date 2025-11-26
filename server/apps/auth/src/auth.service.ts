import { writeToConsole } from '@app/common/utils/writeToConsole';
import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login() {
    try {
      const result = await this.prisma.demo_requests.findMany();
      writeToConsole.log(
        `Creating a demo request... ${JSON.stringify(result)}`,
      );
      return {
        success: true,
        message: 'Login successful',
        user: {
          name: 'test',
          email: 'test-email',
        },
        token: 'dummy-jwt-token-123',
      };
    } catch (error) {
      writeToConsole.error(`Error during login: ${error.message}`);
      return {
        success: false,
        message: 'Login failed',
      };
    }
  }
}
