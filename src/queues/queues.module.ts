import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EmailsProcessor } from './processors/emails.processor';
import { EmailsService } from 'src/modules/emails/emails.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emails',
      connection: {
        host: 'localhost',
        port: 6379
      }
    })
  ],
  providers: [EmailsProcessor]
})
export class QueuesModule {}
