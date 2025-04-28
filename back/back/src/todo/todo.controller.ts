import { Controller, Get, Post, Body, Delete, Param, Patch } from "@nestjs/common"
import { TodoService } from "./todo.services"

@Controller("todos")
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    create(@Body("titulo") titulo: string) {
        return this.todoService.create(titulo)
    }

    @Get()
    findAll() {
        return "teste11111"
        //return this.todoService.findAll()
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.todoService.delete(Number(id))
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() data: {titulo?: string, descricao?: string, data?: string}
    ){
        return this.todoService.update(Number(id), data)
    }
}