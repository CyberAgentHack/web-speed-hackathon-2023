import { Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { FeatureSection } from './feature_section';
import { Product } from './product';

@Entity()
export class FeatureItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => FeatureSection)
  section!: Relation<FeatureSection>;

  @ManyToOne(() => Product)
  product!: Relation<Product>;
}
