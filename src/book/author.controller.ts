import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private authorSer: AuthorService) {}

  @Get(':id')
  async chercherAuteurParId(@Param('id', ParseIntPipe) id) {
    let response = await this.authorSer.getAuthorById(id);
    return response;
  }

  @Post('add')
  async ajouterAuteur(@Body() body) {
    let response = await this.authorSer.addAuthor(body);
    return response;
  }

  @Delete('delete/:id')
  async softDeleteAuthor(@Param('id', ParseIntPipe) id) {
    let response = await this.authorSer.softDeleteAuthor(id);
    return response;
  }
}
