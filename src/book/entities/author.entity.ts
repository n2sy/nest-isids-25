import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auteur')
export class AuthorEntity {
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
}
