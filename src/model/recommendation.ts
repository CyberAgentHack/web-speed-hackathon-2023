import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { Product } from './product';

@Entity()
export class Recommendation {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Product)
  @JoinColumn()
  product!: Relation<Product>;
}
