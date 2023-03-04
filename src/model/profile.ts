import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { MediaFile } from './media_file';
import { User } from './user';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User)
  @JoinColumn()
  user!: Relation<User>;

  @Column()
  name!: string;

  @ManyToOne(() => MediaFile)
  avatar!: Relation<MediaFile>;
}
