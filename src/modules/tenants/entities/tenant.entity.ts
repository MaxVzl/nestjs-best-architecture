import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;
  
  @OneToMany(() => User, (user) => user.tenant)
  users: User[];
}
