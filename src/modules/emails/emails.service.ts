import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { render } from '@react-email/components';
import React from 'react';
import SignInEmail from './emails/sign-in.email';
import { SignInEmailDto } from './dto/sign-in-email.dto';

@Injectable()
export class EmailsService {
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
