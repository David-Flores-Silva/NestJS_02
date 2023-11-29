import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  edad: number;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => Breed, (breed) => breed.id, {
    eager: true,
  })
  breed: Breed;
}
