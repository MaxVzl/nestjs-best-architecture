import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { emailConfig, redisConfig, validationSchema } from 'src/config';
import { EmailsProcessor } from './processors/emails-queue.processor';
import { EmailsQueueService } from './services/emails-queue.service';
import { MailerModule } from '@nestjs-modules/mailer';

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
    BullModule.registerQueue({
      name: 'emails'
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get('email'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailsProcessor, EmailsQueueService],
  exports: [EmailsQueueService]
})
export class QueueModule {}
