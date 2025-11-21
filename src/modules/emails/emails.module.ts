import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { BullModule } from '@nestjs/bullmq';

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
  providers: [EmailsService],
  exports: [EmailsService]
})
export class EmailsModule {}
