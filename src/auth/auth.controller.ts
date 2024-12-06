import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authSer: AuthService) {}

  @Post('register')
  async signup(@Body() body) {
    let data = await this.authSer.register(body);
    return data;
  }
  @Post('login')
  async signin(@Body() body) {
    let data = await this.authSer.login(body);
    return data;
  }
}
