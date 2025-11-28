import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { EmailsService } from '../emails/emails.service';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailsService: EmailsService,
    private readonly sessionsService: SessionsService
  ) {}

  async signIn(loginDto: SignInDto, request: Request) {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (user.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const session = await this.sessionsService.create(user.id, request['ip'], request.headers['user-agent']);

    await this.emailsService.sendSignInEmail({
      email: user.email,
      loginDate: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      loginTime: new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      ipAddress: request['ip'],
      userAgent: request.headers['user-agent'],
    });

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
