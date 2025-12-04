import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { Session } from '../sessions/entities/session.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(session: Session) {
    return this.generateToken(session);
  }

  async refresh(session: Session) {
    return this.generateToken(session);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (user && user.password === password) {
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  private async generateToken(session: Session) {
    const payload = { sub: session.token };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
