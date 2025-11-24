import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { emailConfig, validationSchema } from './configs';
import { BullModule } from '@nestjs/bullmq';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailsModule } from './modules/emails/emails.module';

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
    }),
    EmailsModule
  ],
  providers: [WorkersService],
})
export class WorkersModule {}
