import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class EmailsService {
  constructor(
    @InjectQueue('emails') private emailQueue: Queue
  ) {}

  async sendEmail(email: string) {
    console.log('Sending email', email);
    await this.emailQueue.add('send-email', { email });
  }
}
