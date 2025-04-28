import { Controller, Get, Post, Body, Delete, Param } from "@nestjs/common"
import { TodoService } from "./todo.services"

@Controller("todos")
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    create(@Body("title") title: string) {
        return this.todoService.create(title)
    }

    @Get()
    findAll() {
        return this.todoService.findAll()
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.todoService.delete(Number(id))
    }
}