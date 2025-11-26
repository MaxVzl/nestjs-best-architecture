import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsEvents } from './emails.events';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get('email'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailsService, EmailsEvents],
  exports: [EmailsService]
})
export class EmailsModule {}
