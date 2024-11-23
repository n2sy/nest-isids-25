import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>,
  ) {}

  getAllBooks() {
    return this.bookRepo.find();
  }

  addBook(nBook) {
    return this.bookRepo.save(nBook);
  }

  getBookById(selectedId) {
    return this.bookRepo.find({
      where: {
        id: selectedId,
      },
    });
  }

  async updateBook(book, id) {
    let b = await this.bookRepo.preload({
      id: id,
      ...book,
    });

    if (!b) throw new NotFoundException(`Le livre d'id ${id} n'existe pas`);

    return this.bookRepo.save(b);
  }

  async removeBook(id) {
    let tabBookToRemove = await this.getBookById(id);
    if (!tabBookToRemove.length)
      throw new NotFoundException(`Le livre d'id ${id} n'existe pas`);
    return this.bookRepo.remove(tabBookToRemove[0]);
  }

  async softRemoveBook(id) {
    let tabBookToRemove = await this.getBookById(id);
    if (!tabBookToRemove.length)
      throw new NotFoundException(`Le livre d'id ${id} n'existe pas`);
    return this.bookRepo.softRemove(tabBookToRemove[0]);
  }

  deleteBook(id) {
    return this.bookRepo.delete(id);
  }

  softDeleteBook(id) {
    return this.bookRepo.softDelete(id);
  }

  restoreBook(id) {
    return this.bookRepo.restore(id);
  }

  async recoverBook(selectedId) {
    let tabBookToRemove = await this.bookRepo.find({
      withDeleted: true,
      where: {
        id: selectedId,
      },
    });
    if (!tabBookToRemove.length)
      throw new NotFoundException(`Le livre d'id ${selectedId} n'existe pas`);

    this.bookRepo.recover(tabBookToRemove);
  }

  nbBooksPerYear() {
    let qb = this.bookRepo.createQueryBuilder('book');

    return qb
      .select('book.year, count(book.id) as nbreLivres')
      .groupBy('book.year')
      .getRawMany();
  }

  nbBooksBetweenYears(startYear, endYear) {
    let qb = this.bookRepo.createQueryBuilder('book');

    return (
      qb
        .select('book.year, count(book.id) as nbreLivres')
        .where('book.year >= :y1 AND book.year <= :y2', {
          y1: startYear,
          y2: endYear,
        })
        // .setParameters({ y1: startYear, y2: endYear })
        .groupBy('book.year')
        .getRawMany()
    );
  }
}
