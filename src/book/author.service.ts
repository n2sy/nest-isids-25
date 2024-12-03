import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorRepo: Repository<AuthorEntity>,
  ) {}

  getAuthorById(id) {
    return this.authorRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  addAuthor(newAuthor) {
    return this.authorRepo.save(newAuthor);
  }

  softDeleteAuthor(id) {
    return this.authorRepo.softDelete(id);
  }
}
