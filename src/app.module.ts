import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { FirstMiddleware } from './first/first.middleware';
import { SecondMiddleware } from './second/second.middleware';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'isids25',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BookModule,
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
