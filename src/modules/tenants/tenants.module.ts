import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { TenantDbService } from '../tenant-db/tenant-db.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant]), UsersModule],
  controllers: [TenantsController],
  providers: [TenantsService, TenantDbService],
  exports: [TenantsService]
})
export class TenantsModule {}
