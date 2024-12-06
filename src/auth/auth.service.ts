import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEnum } from './generics/role.enum';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async register(newUser) {
    let newUserEntity = this.userRepo.create({
      username: newUser.username,
      email: newUser.email,
      salt: await bcrypt.genSalt(),
      role: RoleEnum.ROLE_USER,
    });

    newUserEntity.password = await bcrypt.hash(
      newUser.password,
      newUserEntity.salt,
    );
    return this.userRepo.save(newUserEntity);
  }

  async login(credentials) {
    let qb = await this.userRepo.createQueryBuilder('user');

    const u = await qb
      .select('user')
      .where('user.username = :ident OR user.email = :ident')
      .setParameter('ident', credentials.identifiant)
      .getOne();

    if (!u)
      throw new NotFoundException(
        'Aucun utilisateur trouvé avec cet identifiant',
      );

    const test = await bcrypt.compare(credentials.password, u.password);
    if (!test) throw new NotFoundException('Mot de passe invalide');
    return {
      email: u.email,
      username: u.username,
      role: u.role,
    };
  }
}
