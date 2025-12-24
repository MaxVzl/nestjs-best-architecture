import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../../modules/auth/decorators/public.decorator';
import { SessionsService } from 'src/modules/sessions/sessions.service';
import { UsersService } from 'src/modules/users/users.service';
import { TenantsService } from 'src/modules/tenants/tenants.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly sessionsService: SessionsService,
    private readonly usersService: UsersService,
    private readonly tenantsService: TenantsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get('jwt.secret'),
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      // request['session'] = payload;
      const session = await this.sessionsService.findOneByToken(payload.sub);
      const user = await this.usersService.findOneBySessionId(session.id);
      request['session'] = session;
      request['user'] = user;
      try {
        const tenant = await this.tenantsService.findOneByUserId(user.id);
        request['tenant'] = tenant;
      } catch (error) {
        request['tenant'] = null;
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
