import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Tenant } from "../entities/tenant.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TenantsRepository extends Repository<Tenant> {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {
    super(tenantRepository.target, tenantRepository.manager, tenantRepository.queryRunner);
  }
  
  async findOneByName(name: string): Promise<Tenant | null> {
    return this.findOne({ where: { name } });
  }
}