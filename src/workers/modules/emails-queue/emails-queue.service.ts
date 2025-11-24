import { Injectable } from '@nestjs/common';
import { render } from '@react-email/components';
import React from 'react';
import { SignInEmail } from './emails/sign-in.email';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailsQueueService {
  constructor(private readonly mailerService: MailerService) {}

  async send(email: string) {
    const emailHtml = await render(React.createElement(SignInEmail, { email }));

    await this.mailerService.sendMail({
      from: 'SCR Info <mv@scrinfo.net>',
      // to: email,
      to: 'maxime.vozelle@gmail.com',
      subject: 'hello world',
      html: emailHtml,
    });
  }
}
