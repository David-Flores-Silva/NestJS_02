import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Cat } from 'src/cats/entities/cat.entity';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Cat, (cat) => cat.id)
  cats: Cat[];
}
