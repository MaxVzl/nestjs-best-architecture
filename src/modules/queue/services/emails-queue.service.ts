import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailDto } from '../dto/email.dto';

@Injectable()
export class EmailsQueueService {
  constructor(private readonly mailerService: MailerService) {}

  async send(emailDto: EmailDto) {
    await this.mailerService.sendMail(emailDto);
  }
}
