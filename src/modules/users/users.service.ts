import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException(
        `Un utilisateur avec l'email "${createUserDto.email}" existe déjà`,
      );
    }

    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User avec l'ID "${id}" introuvable`);
    }

    return user;
  }

  async findAllByTenantId(tenantId: string): Promise<User[]> {
    return await this.usersRepository.find({ where: { tenant: { id: tenantId } } });
  }

  async findOneByTenantId(tenantId: string, id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id, tenant: { id: tenantId } } });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID "${id}" et le tenant "${tenantId}" introuvable`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Vérifier si le nouvel email (s'il est fourni) n'est pas déjà utilisé par un autre utilisateur
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException(
          `Un utilisateur avec l'mail "${updateUserDto.email}" existe déjà`,
        );
      }
    }

    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'email "${email}" introuvable`);
    }

    return user;
  }

  async findOneBySessionId(sessionId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { sessions: { id: sessionId } } });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec la session "${sessionId}" introuvable`);
    }

    return user;
  }

  async createForTenant(tenantId: string, createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException(
        `Un utilisateur avec l'email "${createUserDto.email}" existe déjà`,
      );
    }

    const user = this.usersRepository.create({
      ...createUserDto,
      tenant: { id: tenantId },
    });
    return await this.usersRepository.save(user);
  }
}
