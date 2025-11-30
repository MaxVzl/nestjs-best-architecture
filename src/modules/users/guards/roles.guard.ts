import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/modules/users/decorators/roles.decorator';
import { Role } from 'src/modules/users/enums/role.enum';
import { UsersService } from '../users.service';
import { SessionsService } from 'src/modules/sessions/sessions.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly sessionsService: SessionsService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { session: { sub } } = context.switchToHttp().getRequest();
    const session = await this.sessionsService.findOneByToken(sub);
    const user = await this.usersService.findOneBySessionId(session.id);
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
