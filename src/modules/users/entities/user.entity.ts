import { Role } from "src/modules/users/enums/role.enum";
import { Tenant } from "src/modules/tenants/entities/tenant.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;
}
