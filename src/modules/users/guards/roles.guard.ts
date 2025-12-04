import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/modules/users/decorators/roles.decorator';
import { Role } from 'src/modules/users/enums/role.enum';
import { UsersService } from '../users.service';
import { IS_PUBLIC_KEY } from 'src/modules/auth/decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const session = request.user;
    if (!session) {
      return false;
    }
    const user = await this.usersService.findOneBySessionId(session.id);
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
