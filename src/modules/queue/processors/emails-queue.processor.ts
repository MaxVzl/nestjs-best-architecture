import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { EmailDto } from "../dto/email.dto";
import { EmailsQueueService } from "../services/emails-queue.service";

@Processor('emails')
// @Processor('emails', { concurrency: 2 })
export class EmailsProcessor extends WorkerHost {
  constructor(private readonly emailsQueueService: EmailsQueueService) {
    super();
  }

  async process(job: Job<EmailDto, any, string>): Promise<any> {
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      // console.log('Processing notification', i);
      await new Promise(resolve => setTimeout(resolve, 100));
      progress = i;
      await job.updateProgress(progress);
    }

    if (job.name === 'sign-in') {
      await this.emailsQueueService.send(job.data);
    } else {
      throw new Error(`Invalid job name: ${job.name}`);
    }
    
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

  @OnWorkerEvent('failed')
  onFailed(job: Job<any, any, string>, error: Error) {
    console.log('Notification failed', job.data, error);
  }

  @OnWorkerEvent('error')
  onError(job: Job<any, any, string>, error: Error) {
    console.log('Notification error', job.data, error);
  }
}