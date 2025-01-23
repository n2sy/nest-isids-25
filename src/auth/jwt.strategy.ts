import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import * as dotenv from 'dotenv';

dotenv.config();
=======
import { log } from 'console';
>>>>>>> origin/main

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
<<<<<<< HEAD
      secretOrKey: process.env.SECRET,
=======
      secretOrKey: 'supersecretcode',
>>>>>>> origin/main
    });
  }

  async validate(payload: any) {
<<<<<<< HEAD
    return { userId: payload.id, role: payload.role };
=======
    console.log('Dans Validate');
    return { userId: payload.id, userRole: payload.role };
>>>>>>> origin/main
  }
}
