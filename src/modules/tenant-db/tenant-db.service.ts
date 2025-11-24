import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Tenant } from '../tenants/entities/tenant.entity';
import TenantDataSource from 'src/database/tenant/tenant.datasource';

@Injectable()
export class TenantDbService {
  private dataSources = new Map<string, DataSource>();

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async getDataSource(tenantId: string): Promise<DataSource> {
    // si on a déjà la connexion en cache
    if (this.dataSources.has(tenantId)) {
      return this.dataSources.get(tenantId)!;
    }

    // sinon, on va chercher les infos dans la base principale
    const tenant: Tenant | null = await this.tenantRepository.findOne({ where: { id: tenantId } });
    if (!tenant) {
      throw new Error(`Tenant ${tenantId} not found`);
    }

    // on crée une connexion à la volée
    const dataSource = TenantDataSource;

    dataSource.setOptions({
      database: dataSource.options.database + tenant.id,
    });

    await dataSource.initialize();
    this.dataSources.set(tenantId, dataSource);
    return dataSource;
  }

  async createDataSource(tenant: Tenant): Promise<void> {    
    const dataSource = TenantDataSource;

    const databasePrefix = dataSource.options.database;

    dataSource.setOptions({
      database: 'postgres',
    });

    await dataSource.initialize();
    await dataSource.query(`CREATE DATABASE ${tenant.id}`);
    await dataSource.destroy();

    dataSource.setOptions({
      database: databasePrefix + tenant.id,
    });

    await dataSource.initialize();
    await dataSource.runMigrations();
    await dataSource.destroy();
  }
}
