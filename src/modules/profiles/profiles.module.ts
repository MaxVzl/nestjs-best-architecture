import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesRepository } from './profiles.repository';
import { TenantDbModule } from '../tenant-db/tenant-db.module';
import { ProfilesController } from './profiles.controller';
import { TenantsModule } from '../tenants/tenants.module';
import { SessionsModule } from '../sessions/sessions.module';
import { UsersModule } from '../users/users.module';
  
@Module({
  imports: [TenantDbModule, TenantsModule, SessionsModule, UsersModule],
  providers: [ProfilesService, ProfilesRepository],
  exports: [ProfilesService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
