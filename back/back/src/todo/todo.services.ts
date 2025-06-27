import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "./prisma.service"
import { CreateTodoDto } from "./dto/create-todo.dto"
import { UpdateTodoDto } from "./dto/update-todo.dto"

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, data: CreateTodoDto) {
        const lastTodo = await this.prisma.todo.findFirst({
            where: { userId },
            orderBy: { idTodo: 'desc' },
        })

        const nextTodo = lastTodo ? lastTodo.idTodo + 1 : 1

        return this.prisma.todo.create({
            data: {
                ...data,
                userId,
                idTodo: nextTodo,
            }
        })
    }

    async findAll(userId: string) {
        return this.prisma.todo.findMany({
            where: {userId},
            orderBy: {createdAt: "desc"}
        })
    }

    async delete(userId: string, todoId: number) {
        return this.prisma.todo.delete({
            where: {id: todoId, userId},
        })
    }

    async update(userId: string, todoId:number, data: UpdateTodoDto) {
        return this.prisma.todo.update({
            where: {id: todoId, userId},
            data,
        })
    }

    async filtrar(userId: string, filtros: { titulo?: string, data?: string, idTodo?: string}) {
        const where: any = {userId}

        if(filtros.titulo) {
            where.titulo = {
                contains: filtros.titulo,
                mode: 'insensitive',
            }
        }

        if(filtros.data) {
            where.data = filtros.data
        }

        if(filtros.idTodo) {
            where.id = parseInt(filtros.idTodo)
        }

        return this.prisma.todo.findMany({
            where,
        })
    }
}