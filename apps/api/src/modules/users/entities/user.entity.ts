import { Role } from "../enums/role.enum";
import { Tenant } from "../../tenants/entities/tenant.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;
  
  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, array: true, default: [Role.User] })
  roles: Role[];

  // @ManyToOne(() => Tenant, (tenant) => tenant.users, { eager: true })
  @ManyToOne(() => Tenant, (tenant) => tenant.users)
  tenant: Tenant;
}
