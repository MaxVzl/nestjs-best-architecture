import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EmailsService {
  constructor(
    @InjectQueue('emails') private emailQueue: Queue
  ) {}

  async sendSignInEmail(user: User, request: Request) {
    await this.emailQueue.add('sign-in', {
      email: user.email,
      loginDate: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      loginTime: new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      // ipAddress: request.ip,
      userAgent: request.headers['user-agent'],
    });
  }
}
