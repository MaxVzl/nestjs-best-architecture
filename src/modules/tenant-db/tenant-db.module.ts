import { Module } from '@nestjs/common';
import { TenantDbService } from './tenant-db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from '../tenants/entities/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [TenantDbService],
  exports: [TenantDbService]
})
export class TenantDbModule {}
