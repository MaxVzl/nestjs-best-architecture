import { Role } from "src/modules/users/enums/role.enum";
import { Tenant } from "src/modules/tenants/entities/tenant.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;
  
  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, array: true, default: [Role.User] })
  roles: Role[];

  // @ManyToOne(() => Tenant, (tenant) => tenant.users, { eager: true })
  @ManyToOne(() => Tenant, (tenant) => tenant.users)
  tenant: Tenant;
}
