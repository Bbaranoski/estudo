import { Controller, Get, Post, Body, Delete, Param, Patch, UsePipes, ValidationPipe, Query } from "@nestjs/common"
import { TodoService } from "./todo.services"
import { CreateTodoDto } from "./dto/create-todo.dto"
import { UpdateTodoDto } from "./dto/update-todo.dto"

@Controller("todos")
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    @UsePipes(new ValidationPipe({whitelist: true}))
    create(@Body() data: CreateTodoDto) {
        console.log('Tua mae é bixa')
        return this.todoService.create(data)
    }

    @Post('filtro')
    filter(@Body() filtos: any) {
        return this.todoService.filtrar(filtos)
    }

    @Get()
    findAll() {
        console.log('Breno é bixa')
        return this.todoService.findAll()
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.todoService.delete(Number(id))
    }

    @Patch(":id")
    @UsePipes(new ValidationPipe({whitelist: true}))
    update(
        @Param("id") id: string,
        @Body() data: UpdateTodoDto
    ){
        return this.todoService.update(Number(id), data)
    }
}