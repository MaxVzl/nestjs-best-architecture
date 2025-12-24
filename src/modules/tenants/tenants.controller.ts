import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Roles } from '../users/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../users/guards/roles.guard';
import { UsersService } from '../users/users.service';

@Controller('admin/tenants')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin)
export class TenantsController {
  constructor(
    private readonly tenantsService: TenantsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  findAll() {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tenantsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tenantsService.remove(id);
  }

  @Post(':id/users')
  async createUser(@Param('id', ParseUUIDPipe) id: string, @Body() createUserDto: CreateUserDto) {
    await this.tenantsService.findOne(id);

    return this.usersService.createForTenant(id, createUserDto);
  }

  @Get(':id/users')
  async findAllUsers(@Param('id', ParseUUIDPipe) id: string) {
    await this.tenantsService.findOne(id);
    
    return this.usersService.findAllByTenantId(id);
  }
}
