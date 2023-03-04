import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { FeatureItem } from './feature_item';

@Entity()
export class FeatureSection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @OneToMany(() => FeatureItem, (item) => item.section)
  items!: Relation<FeatureItem[]>;
}
