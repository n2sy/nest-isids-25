import { TimeStamp } from 'src/book/generics/timestamp';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../generics/role.enum';

@Entity('user')
export class UserEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  salt: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    // default : RoleEnum.ROLE_USER
  })
  role;
}
