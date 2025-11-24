import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailsService } from '../emails/emails.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailsService: EmailsService
  ) {}

  async signIn(loginDto: SignInDto, request: Request) {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (user.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.emailsService.sendSignInEmail(user, request);

    return this.generateToken(user);
  }

  async refresh(user: User) {
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { sub: user.id, email: user.email, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
