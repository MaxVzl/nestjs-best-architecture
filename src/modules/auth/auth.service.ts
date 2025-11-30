import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { EmailsService } from '../emails/emails.service';
import { SessionsService } from '../sessions/sessions.service';
import { Session } from '../sessions/entities/session.entity';

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

    return this.generateToken(session);
  }

  async refresh(session: Session) {
    return this.generateToken(session);
  }

  private async generateToken(session: Session) {
    const payload = { sub: session.token };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
