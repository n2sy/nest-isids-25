import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../generics/timestamp';
import { BookEntity } from './book.entity';

@Entity('auteur')
export class AuthorEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id;

  @Column({
    type: 'varchar',
    length: 50,
  })
  prenom;

  @Column({
    length: 50,
  })
  nom: string;

  @OneToMany(() => BookEntity, (b) => b.author)
  listeLivres: BookEntity[];
}
