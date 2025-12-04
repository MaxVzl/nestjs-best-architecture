import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Session } from 'src/modules/sessions/entities/session.entity';

@Injectable()
export class CurrentSessionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    request.currentSession = request.user as Session;
    return next.handle();
  }
}
