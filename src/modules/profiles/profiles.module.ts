import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesRepository } from './profiles.repository';
import { TenantDbModule } from '../tenant-db/tenant-db.module';
import { ProfilesController } from './profiles.controller';
import { TenantsModule } from '../tenants/tenants.module';
  
@Module({
  imports: [TenantDbModule, TenantsModule],
  providers: [ProfilesService, ProfilesRepository],
  exports: [ProfilesService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
