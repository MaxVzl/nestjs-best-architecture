import { Injectable } from '@nestjs/common';
import { render } from '@react-email/components';
import React from 'react';
import SignInEmail from './templates/sign-in.email';
import { SignInEmailDto } from './dto/sign-in-email.dto';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class EmailsService {
  constructor(@InjectQueue('emails') private emailQueue: Queue) {}

  async sendSignInEmail(signInEmailDto: SignInEmailDto) {
    const emailHtml = await render(React.createElement(SignInEmail, signInEmailDto));

    await this.emailQueue.add('sign-in', {
      to: signInEmailDto.email,
      subject: 'Nouvelle connexion détectée sur votre compte SCR Info',
      html: emailHtml,
    });
  }
}
