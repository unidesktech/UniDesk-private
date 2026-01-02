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
import { RedisModule } from '../../../libs/redis/redis.module';
import { MeGatewayController } from './me/me.gateway.controller';
import { MeService } from './me/me.gateway.service';
import { PrismaModule } from '@app/prisma';
import { SidebarService } from './me/sidebar.service';
import { PermissionResolverService } from '@app/common/permissions/permission-resolver.service';
import { RedisCacheService } from '../../../libs/redis/redis-cache.service';
import { StudentGatewayService } from './student/student.gateway.service';
import { StudentGatewayController } from './student/student.gateway.controller';
import { ParentGatewayController } from './parent/parent.gateway.controller';
import { ParentGatewayService } from './parent/parent.gateway.service';
import { SubjectGatewayController } from './subject/subject.gateway.controller';
import { SubjectGatewayService } from './subject/subject.gateway.service';
import { FaqGatewayController } from './faq/faq.gateway.controller';
import { FaqGatewayService } from './faq/faq.gateway.service';

@Module({
  imports: [
    CommonModule,
    PrismaModule,
    RedisModule,
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
    MeGatewayController,
    FaqGatewayController,
    StudentGatewayController,
    ParentGatewayController,
    SubjectGatewayController,
  ],
  providers: [
    AuthGatewayService,
    RequestDemoGateWayService,
    SchoolGatewayService,
    commonGateWayService,
    FaqGatewayService,
    MeService,
    SidebarService,
    PermissionResolverService,
    RedisCacheService,
    StudentGatewayService,
    ParentGatewayService,
    SubjectGatewayService,
  ],
})
export class ApiGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
