import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule, LoggerMiddleware } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGatewayController } from './auth/auth.gateway.controller';
import { RequestDemoGatewayController } from './request-demo/request-demo.gateway.controller';
import { AuthGatewayService } from './auth/auth.gateway.service';
import { RequestDemoGateWayService } from './request-demo/request-demo.gateway.service';
import { SchoolGatewayController } from './school/school.gateway.controller';
import { SchoolGatewayService } from './school/school.gateway.service';
import { commonGateWayService } from './common/common.gateway.service';
import { CommonGatewayController } from './common/common.gateway.controller';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [
    AuthGatewayController,
    RequestDemoGatewayController,
    SchoolGatewayController,
    CommonGatewayController,
  ],
  providers: [
    AuthGatewayService,
    RequestDemoGateWayService,
    SchoolGatewayService,
    commonGateWayService,
  ],
})
export class ApiGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
