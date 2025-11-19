import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Tenant } from "../entities/tenant.entity";

@Injectable()
export class TenantsRepository extends Repository<Tenant> {
  constructor(private readonly dataSource: DataSource) {
    super(Tenant, dataSource.createEntityManager());
  }
  
  async findOneByName(name: string): Promise<Tenant | null> {
    return this.findOne({ where: { name } });
  }
}