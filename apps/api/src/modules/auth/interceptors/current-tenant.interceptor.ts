import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantsService } from '../../tenants/tenants.service';

@Injectable()
export class CurrentTenantInterceptor implements NestInterceptor {
  constructor(private readonly tenantsService: TenantsService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { sub } = request.user || {};
    if (sub) {
      const tenant = await this.tenantsService.findOneByUserId(sub);
      request.currentTenant = tenant;
    }
    return next.handle();
  }
}
