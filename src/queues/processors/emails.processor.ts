import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

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