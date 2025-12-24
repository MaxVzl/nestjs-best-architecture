import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantDbService } from '../tenant-db/tenant-db.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    private readonly tenantDbService: TenantDbService,
    private readonly usersService: UsersService,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    // Vérifier si un tenant avec le même nom existe déjà
    const existingTenant = await this.tenantsRepository.findOne({
      where: { name: createTenantDto.name },
    });

    if (existingTenant) {
      throw new ConflictException(
        `Un tenant avec le nom "${createTenantDto.name}" existe déjà`,
      );
    }

    const tenant = this.tenantsRepository.create(createTenantDto);
    await this.tenantsRepository.save(tenant);
    
    await this.tenantDbService.createDataSource(tenant);
    
    return tenant;
  }

  async findAll(): Promise<Tenant[]> {
    return await this.tenantsRepository.find();
  }

  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.tenantsRepository.findOne({ where: { id } });

    if (!tenant) {
      throw new NotFoundException(`Tenant avec l'ID "${id}" introuvable`);
    }

    return tenant;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.findOne(id);

    // Vérifier si le nouveau nom (s'il est fourni) n'est pas déjà utilisé par un autre tenant
    if (updateTenantDto.name && updateTenantDto.name !== tenant.name) {
      const existingTenant = await this.tenantsRepository.findOne({
        where: { name: updateTenantDto.name },
      });

      if (existingTenant) {
        throw new ConflictException(
          `Un tenant avec le nom "${updateTenantDto.name}" existe déjà`,
        );
      }
    }

    Object.assign(tenant, updateTenantDto);
    return await this.tenantsRepository.save(tenant);
  }

  async remove(id: string): Promise<void> {
    const tenant = await this.findOne(id);
    await this.tenantsRepository.remove(tenant);
  }

  async findOneByUserId(userId: string): Promise<Tenant> {
    const tenant = await this.tenantsRepository.findOne({ where: { users: { id: userId } } });

    if (!tenant) {
      throw new NotFoundException(`Tenant avec l'utilisateur "${userId}" introuvable`);
    }

    return tenant;
  }
}
