import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>
  ) {}

  async create(userId: string, ipAddress: string, userAgent: string): Promise<Session> {
    return this.sessionsRepository.save({
      user: { id: userId },
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      ipAddress,
      userAgent,
    });
  }

  async remove(session: Session): Promise<void> {
    await this.sessionsRepository.remove(session);
  }

  async extend(session: Session): Promise<Session> {
    return this.sessionsRepository.save({
      ...session,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });
  }

  async findOneByToken(token: string): Promise<Session> {
    const session = await this.sessionsRepository.findOne({ where: { token } });

    if (!session) {
      throw new NotFoundException(`Session avec le token "${token}" introuvable`);
    }

    return session;
  }
}
