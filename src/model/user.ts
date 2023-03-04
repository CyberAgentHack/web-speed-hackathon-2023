import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, type Relation, Unique } from 'typeorm';

import { Order } from './order';
import { Profile } from './profile';
import { Review } from './review';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile!: Relation<Profile>;

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Relation<Review[]>;

  @OneToMany(() => Order, (item) => item.user)
  orders!: Relation<Order[]>;
}
