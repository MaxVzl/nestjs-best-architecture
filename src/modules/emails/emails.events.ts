import { OnQueueEvent, QueueEventsHost, QueueEventsListener } from "@nestjs/bullmq";
import { Job } from "bullmq";

@QueueEventsListener('emails')
export class EmailsEvents extends QueueEventsHost {
  @OnQueueEvent('completed')
  onCompleted(job: Job) {
    console.log('Email completed');
  }
}