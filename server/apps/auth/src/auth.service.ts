import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return {
      success: true,
      message: 'Login successful',
      user: {
        name: 'test',
        email: 'test-email',
      },
      token: 'dummy-jwt-token-123',
    };
  }
}
