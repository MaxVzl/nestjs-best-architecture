import { Role } from "src/modules/users/enums/role.enum";
import { Tenant } from "src/modules/tenants/entities/tenant.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "src/modules/sessions/entities/session.entity";

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
  
  @ManyToOne(() => Tenant, (tenant) => tenant.users, { lazy: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @OneToMany(() => Session, (session) => session.user, { lazy: true })
  sessions: Session[];
}
