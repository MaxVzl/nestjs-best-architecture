import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SessionsService } from 'src/modules/sessions/sessions.service';

@Injectable()
export class CurrentSessionInterceptor implements NestInterceptor {
  constructor(private readonly sessionsService: SessionsService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { sub } = request.session || {};
    if (sub) {
      const session = await this.sessionsService.findOneByToken(sub);
      request.currentSession = session;
    }
    return next.handle();
  }
}
