import { Controller, Get, Post, Body, Delete, Param, Patch, UsePipes, ValidationPipe, UseGuards, Req } from "@nestjs/common"
import { TodoService } from "./todo.services"
import { CreateTodoDto } from "./dto/create-todo.dto"
import { UpdateTodoDto } from "./dto/update-todo.dto"
import { JwtAuthGuard } from "src/auth/jwt-auth.guard"

@UseGuards(JwtAuthGuard)
@Controller("todos")
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    @UsePipes(new ValidationPipe({whitelist: true}))
    create(@Req() req, @Body() data: CreateTodoDto) {
        return this.todoService.create(req.user.userId, data)
    }

    @Post('filtro')
    filter(@Req() req, @Body() filtos: any) {
        return this.todoService.filtrar(req.user.userId, filtos)
    }

    @Get()
    findAll(@Req() req) {
        return this.todoService.findAll(req.user.userId)
    }

    @Delete(":id")
    delete(@Req() req, @Param("id") id: string) {
        return this.todoService.delete(req.user.userId, Number(id))
    }

    @Patch(":id")
    @UsePipes(new ValidationPipe({whitelist: true}))
    update(
        @Req() req,
        @Param("id") id: string,
        @Body() data: UpdateTodoDto
    ){
        
        return this.todoService.update(req.user.userId, Number(id), data)
    }
}