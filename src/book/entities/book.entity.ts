import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../generics/timestamp';
import { AuthorEntity } from './author.entity';

@Entity('livre')
export class BookEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // {
  //     name: 'intitle',
  //     length : 50,
  //     update : false,
  //     unique : true
  // }
  title: string;

  @Column()
  year: number;

  @Column()
  publisher: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @ManyToOne(() => AuthorEntity, (auth) => auth.listeLivres, {
    eager: false,
    cascade: true,
  })
  author: AuthorEntity;
}
