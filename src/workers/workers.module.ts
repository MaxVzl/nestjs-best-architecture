import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EmailsProcessor } from './modules/emails-queue/emails-queue.processor';
import { EmailsQueueService } from './modules/emails-queue/emails-queue.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { emailConfig, redisConfig, validationSchema } from 'src/config';
import { EmailsQueueModule } from './modules/emails-queue/emails-queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        emailConfig,
        redisConfig
      ],
      validationSchema: validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      }
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        connection: {
          ...configService.get('redis')
        }
      }),
      inject: [ConfigService]
    }),
    EmailsQueueModule
  ],
  providers: [EmailsProcessor, EmailsQueueService]
})
export class WorkersModule {}
