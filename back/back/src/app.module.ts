import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './todo/prisma.service';
import { TodoService } from './todo/todo.services';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, TodoService],
})
export class AppModule {}
