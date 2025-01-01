import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../generics/timestamp';
import { AuthorEntity } from './author.entity';
import { UserEntity } from 'src/auth/entities/user.entity';

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

  @ManyToOne(() => AuthorEntity, (auth) => auth.listeLivres, {
    eager: false,
    cascade: true,
  })
  author: AuthorEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
