import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantsService } from 'src/modules/tenants/tenants.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class CurrentTenantInterceptor implements NestInterceptor {
  constructor(
    private readonly usersService: UsersService,
    private readonly tenantsService: TenantsService
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const user = await this.usersService.findOneBySessionId(request.user.id);
    const tenant = await this.tenantsService.findOneByUserId(user.id);
    request.currentTenant = tenant;
    return next.handle();
  }
}
