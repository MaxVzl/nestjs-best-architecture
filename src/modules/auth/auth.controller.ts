import { Controller, Post, Body, Get, Req, UseGuards, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { Session } from '../sessions/entities/session.entity';
import { CurrentSession } from './decorators/current-session.decorator';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Public()
  @Post('login')
  signIn(@Body() loginDto: SignInDto, @Req() request: Request) {
    return this.authService.signIn(loginDto, request);
  }

  @Delete('logout')
  signOut(@CurrentSession() session: Session) {
    return this.authService.signOut(session);
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
