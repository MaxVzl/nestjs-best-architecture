import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsEvents } from './emails.events';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
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
  ],
  providers: [EmailsService, EmailsEvents],
  exports: [EmailsService]
})
export class EmailsModule {}
