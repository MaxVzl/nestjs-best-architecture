import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid', { name: 'user_id', unique: true, nullable: false })
  userId: string;
}
