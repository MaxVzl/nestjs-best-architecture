import { Injectable } from '@nestjs/common';
import { TenantDbService } from '../tenant-db/tenant-db.service';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesRepository {
  constructor(
    private readonly tenantDbService: TenantDbService,
  ) {}
  
  async findAll(tenantId: string): Promise<Profile[]> {
    const dataSource = await this.tenantDbService.getDataSource(tenantId);
    return await dataSource.getRepository(Profile).find();
  }
}
