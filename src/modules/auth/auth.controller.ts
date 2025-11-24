import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('auth')
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
  refresh(@CurrentUser() user: User) {
    return this.authService.refresh(user);
  }
}
