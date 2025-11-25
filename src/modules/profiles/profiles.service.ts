import { Injectable } from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly profilesRepository: ProfilesRepository,
  ) {}

  async findAll(tenantId: string): Promise<Profile[]> {
    return await this.profilesRepository.findAll(tenantId);
  }
}
