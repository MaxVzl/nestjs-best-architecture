import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { SignInEmailDto } from 'src/modules/emails/dto/sign-in-email.dto';

@Injectable()
export class EmailsQueueService {
  constructor(@InjectQueue('emails') private emailQueue: Queue) {}

  async sendSignInEmail(signInEmailDto: SignInEmailDto) {
    await this.emailQueue.add('sign-in', signInEmailDto);
  }
}
