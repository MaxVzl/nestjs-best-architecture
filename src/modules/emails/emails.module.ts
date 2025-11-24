import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { BullModule } from '@nestjs/bullmq';
import { EmailsEvents } from './emails.events';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emails'
    }),
  ],
  providers: [EmailsService, EmailsEvents],
  exports: [EmailsService]
})
export class EmailsModule {}
