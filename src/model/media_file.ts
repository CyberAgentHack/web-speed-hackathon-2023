import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['filename'])
export class MediaFile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  filename!: string;
}
