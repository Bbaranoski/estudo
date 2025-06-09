import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './todo/prisma.service';
import { TodoService } from './todo/todo.services';
import { TodoController } from './todo/todo.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController, TodoController],
  providers: [AppService, PrismaService, TodoService],
})
export class AppModule {}
