import { Module } from '@nestjs/common';
import { CommonsController } from './commons.controller';
import { CommonsService } from './commons.service';
import { PrismaModule } from '@app/prisma';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [CommonsController],
  providers: [CommonsService],
})
export class CommonsModule {}
