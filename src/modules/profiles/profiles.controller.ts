import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { CurrentTenant } from '../auth/decorators/current-tenant.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('profiles')
@UseGuards(AuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async findAll(@CurrentTenant() tenant: Tenant): Promise<Profile[]> {
    return await this.profilesService.findAll(tenant.id);
  }
}
