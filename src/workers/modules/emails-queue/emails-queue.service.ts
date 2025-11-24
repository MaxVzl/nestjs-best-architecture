import { Injectable } from '@nestjs/common';
import { render } from '@react-email/components';
import React from 'react';
import { SignInEmail } from './emails/sign-in.email';
import { MailerService } from '@nestjs-modules/mailer';
import { SignInEmailDto } from 'src/workers/modules/emails-queue/dto/sign-in-email.dto';

@Injectable()
export class EmailsQueueService {
  constructor(private readonly mailerService: MailerService) {}

  async sendSignInEmail(signInEmailDto: SignInEmailDto) {
    const emailHtml = await render(React.createElement(SignInEmail, signInEmailDto));

    await this.mailerService.sendMail({
      to: signInEmailDto.email,
      subject: 'Nouvelle connexion détectée sur votre compte SCR Info',
      html: emailHtml,
    });
  }
}
