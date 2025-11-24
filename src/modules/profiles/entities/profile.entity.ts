import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
