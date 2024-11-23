import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
  editor: string;

  author: AuthorEntity;
}
