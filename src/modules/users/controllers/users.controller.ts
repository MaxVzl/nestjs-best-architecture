import { Controller, Get, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from '../users.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CurrentTenant } from 'src/modules/auth/decorators/current-tenant.decorator';
import { Tenant } from 'src/modules/tenants/entities/tenant.entity';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@CurrentTenant() tenant: Tenant) {
    return tenant.users;
  }

  @Get(':id')
  findOne(@CurrentTenant() tenant: Tenant, @Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneByTenantId(tenant.id, id);
  }
}
