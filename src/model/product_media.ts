import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { MediaFile } from './media_file';
import { Product } from './product';

@Entity()
export class ProductMedia {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product)
  product!: Relation<Product>;

  @ManyToOne(() => MediaFile)
  file!: Relation<MediaFile>;

  @Column()
  isThumbnail!: boolean;
}
