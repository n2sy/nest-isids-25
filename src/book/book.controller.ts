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
  Query,
<<<<<<< HEAD
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/guards/admin-auth/admin-auth.guard';
=======
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard/jwt-auth-guard.guard';
import { AdminGuard } from 'src/guards/admin/admin.guard';
>>>>>>> origin/main

//@UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
  @Inject(BookService) bookSer: BookService;

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async chercherTousLesLivres(@Req() req: Request) {
    console.log(req);
    try {
      let data = await this.bookSer.getAllBooks();
      return data;
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

<<<<<<< HEAD
  //@UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Post('/add')
  async ajouterLivre(@Body() body) {
    console.log(body)
=======
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('/new')
  async ajouterLivre(@Req() req: Request, @Body() body) {
>>>>>>> origin/main
    try {
      let data = await this.bookSer.addBook(body, req['user']['userId']);
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

  @Get('/title')
  async chercherBookParTitre(@Query('title') title) {
    let response = await this.bookSer.getBookByTitle(title);
    if (!response.length)
      throw new NotFoundException(
        `Aucun livre avec ce titre n'existe dans notre BD`,
      );
    return response;
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

  @Get('stats')
  async nbreDeLivreParAnnee() {
    let data = await this.bookSer.nbBooksPerYear();
    return data;
  }

  @Get('stats/v2')
  async nbreDeLivreEntreDeuxAnnes(
    @Query('startyear', ParseIntPipe) year1,
    @Query('endyear', ParseIntPipe) year2,
  ) {
    let data = await this.bookSer.nbBooksBetweenYears(year1, year2);
    return data;
  }
}
