import { Body, Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/modules/users/decorators/roles.decorator';
import { Role } from 'src/modules/users/enums/role.enum';

@Controller('users')
@Roles(Role.Admin)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
