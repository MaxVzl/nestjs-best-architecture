import { Test, TestingModule } from '@nestjs/testing';
import { TenantDbService } from './tenant-db.service';

describe('TenantDbService', () => {
  let service: TenantDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenantDbService],
    }).compile();

    service = module.get<TenantDbService>(TenantDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
