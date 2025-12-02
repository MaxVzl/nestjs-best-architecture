import { Controller, Post, Body, Get, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { Session } from '../sessions/entities/session.entity';
import { CurrentSession } from './decorators/current-session.decorator';
import { CurrentSessionInterceptor } from './interceptors/current-session.interceptor';

@Controller('auth')
@UseGuards(AuthGuard)
@UseInterceptors(CurrentSessionInterceptor, CurrentUserInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Public()
  @Post('login')
  signIn(@Body() loginDto: SignInDto, @Req() request: Request) {
    return this.authService.signIn(loginDto, request);
  }

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
  
  @Get('refresh')
  refresh(@CurrentSession() session: Session) {
    return this.authService.refresh(session);
  }
}
