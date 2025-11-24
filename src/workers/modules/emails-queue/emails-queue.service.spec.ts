import { Test, TestingModule } from '@nestjs/testing';
import { EmailsQueueService } from './emails-queue.service';

describe('EmailsQueueService', () => {
  let service: EmailsQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailsQueueService],
    }).compile();

    service = module.get<EmailsQueueService>(EmailsQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
