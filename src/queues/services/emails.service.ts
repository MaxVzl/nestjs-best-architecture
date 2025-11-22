import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { render } from '@react-email/components';
import React from 'react';
import { SignInEmail } from '../../emails/sign-in.email';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: string) {
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
