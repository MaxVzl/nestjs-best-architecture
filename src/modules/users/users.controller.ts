import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/modules/users/decorators/roles.decorator';
import { Role } from 'src/modules/users/enums/role.enum';

@Roles(Role.Admin)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
