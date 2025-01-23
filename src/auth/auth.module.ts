import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from './entities/user.entity';
<<<<<<< HEAD
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './jwt.strategy';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
=======
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
 PassportModule.register({ defaultStrategy: 'jwt' }),
 JwtModule.register({
    secret : 'supersecretcode',
    signOptions: {
      expiresIn: 3600,
    },
})],
>>>>>>> origin/main
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
