import { Controller, Post, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { Session } from '../sessions/entities/session.entity';
import { CurrentSession } from './decorators/current-session.decorator';
import { CurrentSessionInterceptor } from './interceptors/current-session.interceptor';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@UseInterceptors(CurrentSessionInterceptor, CurrentUserInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@CurrentSession() session: Session) {
    return this.authService.login(session);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  refresh(@CurrentSession() session: Session) {
    console.log(session);
    return this.authService.refresh(session);
  }
}
