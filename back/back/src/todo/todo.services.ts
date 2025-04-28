import { Injectable } from "@nestjs/common"
import { PrismaService } from "./prisma.service"

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService) {}

    async create(titulo: string) {
        return this.prisma.todo.create({
            data: {
                titulo: titulo,
                descricao: "teste",
                data: "teste2"
            },
        })
    }

    async findAll() {
        return this.prisma.todo.findMany()
    }

    async delete(id: number) {
        return this.prisma.todo.delete({
            where: {id},
        })
    }
}