import { Module } from '@nestjs/common';
import { EmailsQueueService } from './emails-queue.service';
import { BullModule } from '@nestjs/bullmq';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
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
  providers: [EmailsQueueService]
})
export class EmailsQueueModule {}
