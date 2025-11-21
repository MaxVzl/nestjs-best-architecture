import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { render } from '@react-email/components';
import nodemailer from 'nodemailer';
import React from 'react';
import { SignInEmail } from '../../emails/sign-in.email';

const transporter = nodemailer.createTransport({
  host: 'smtp-fr.securemail.pro',
  port: 465,
  secure: true,
  auth: {
    user: 'mv@scrinfo.net',
    pass: 'pass',
  },
});

@Processor('emails')
// @Processor('emails', { concurrency: 2 })
export class EmailsProcessor extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      // console.log('Processing notification', i);
      await new Promise(resolve => setTimeout(resolve, 100));
      progress = i;
      await job.updateProgress(progress);
    }
    
    const emailHtml = await render(React.createElement(SignInEmail, { email: job.data.email }));
    
    const options = {
      from: 'SCR Info <mv@scrinfo.net>',
      // to: job.data.email,
      to: 'maxime.vozelle@gmail.com',
      subject: 'hello world',
      html: emailHtml,
    };
    
    await transporter.sendMail(options);
    return {};
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<any, any, string>) {
    console.log('Notification completed', job.data);
  }
}