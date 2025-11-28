import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule, LoggerMiddleware } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGatewayController } from './auth/auth.gateway.controller';
import { RequestDemoGatewayController } from './request-demo/request-demo.gateway.controller';
import { AuthGatewayService } from './auth/auth.gateway.service';
import { RequestDemoGateWayService } from './request-demo/request-demo.gateway.service';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AuthGatewayController, RequestDemoGatewayController],
  providers: [AuthGatewayService, RequestDemoGateWayService],
})
export class ApiGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
