import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Roles } from '../users/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('tenants')
@Roles(Role.Admin)
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  findAll() {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(id);
  }

  @Post(':id/users')
  createUser(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    return this.tenantsService.createUser(id, createUserDto);
  }

  @Get(':id/users')
  findAllUsers(@Param('id') id: string) {
    return this.tenantsService.findAllUsers(id);
  }
}
