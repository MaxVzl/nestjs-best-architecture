import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EmailsProcessor } from './processors/emails.processor';
import { EmailsService } from './services/emails.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { emailConfig, validationSchema } from 'src/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        emailConfig
      ],
      validationSchema: validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      }
    }),
    BullModule.registerQueue({
      name: 'emails',
      connection: {
        host: 'localhost',
        port: 6379
      }
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get('email'),
      }),
      inject: [ConfigService],
    })
  ],
  providers: [EmailsProcessor, EmailsService]
})
export class QueuesModule {}
