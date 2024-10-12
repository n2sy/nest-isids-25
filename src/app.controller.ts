import { Controller, Get } from '@nestjs/common';

@Controller('isids')
export class AppController {
  constructor() {}

  @Get('test')
  getHello() {
    return {
      message: 'Message envoyé',
    };
  }
}
