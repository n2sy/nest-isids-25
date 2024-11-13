import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  @Inject(BookService) bookSer: BookService;

  @Get('/all')
  async chercherTousLesLivres() {
    try {
      let data = await this.bookSer.getAllBooks();
      return { allBooks: data };
    } catch (err) {
      console.log(err);
    }
  }
  //   chercherTousLesLivres() {
  //     return this.bookSer
  //       .getAllBooks()
  //       .then((data: BookEntity[]) => {
  //         return { allBooks : data };
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  @Post('/new')
  async ajouterLivre(@Body() body) {
    try {
      let data = await this.bookSer.addBook(body);
      return { data };
    } catch (err) {
      new ConflictException();
    }
  }

  @Get('/search/:id')
  async chercherBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.getBookById(id);
    if (!response.length)
      throw new NotFoundException(`Le livre d'id ${id} n'existe pas`);
    return response[0];
  }

  @Put('/edit/:id')
  async modifierBook(@Body() body, @Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.updateBook(body, id);
    return response;
  }

  @Delete('remove/:id')
  async removeBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.removeBook(id);
    return response;
  }
  @Delete('soft/remove/:id')
  async softRemoveBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.softRemoveBook(id);
    return response;
  }

  @Delete('delete/:id')
  async deleteBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.deleteBook(id);
    return response;
  }

  @Delete('restore/:id')
  async restaurerBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.restoreBook(id);
    return response;
  }
  @Delete('recover/:id')
  async recoverBook(@Param('id', ParseIntPipe) id) {
    let response = await this.bookSer.recoverBook(id);
    return response;
  }
}
