import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { FirstMiddleware } from './first/first.middleware';
import { SecondMiddleware } from './second/second.middleware';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

dotenv.config();

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.APP_HOST,
      port: Number(process.env.PORT),
      username: process.env.APP_USERNAME,
      password: process.env.APP_PWD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    BookModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(FirstMiddleware).forRoutes(''); For all routes
    consumer.apply(SecondMiddleware).forRoutes('');
    consumer.apply(FirstMiddleware).forRoutes({
      path: '/task*',
      method: RequestMethod.POST,
    });
  }
}
