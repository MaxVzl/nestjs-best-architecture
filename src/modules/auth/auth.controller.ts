import { Controller, Post, Body, Get, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../users/entities/tenant.entity';
import { CurrentUserInterceptor } from '../../common/interceptors/current-user/current-user.interceptor';

@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() loginDto: SignInDto) {
    return this.authService.signIn(loginDto);
  }

  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return user;
  }
}
