import { Injectable } from "@nestjs/common"
import { PrismaService } from "./prisma.service"

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService) {}

    async create(data: {titulo: string, descricao: string, data: string}) {
        return this.prisma.todo.create({
            data,
        })
    }

    async findAll(ordem: 'asc' | 'desc' = 'asc') {
        return this.prisma.todo.findMany({
            orderBy: {
                id: ordem,
            },
        })
    }

    async delete(id: number) {
        return this.prisma.todo.delete({
            where: {id},
        })
    }

    async update(id:number, data: {titulo?: string, descricao?: string, data?: string}) {
        return this.prisma.todo.update({
            where: {id},
            data,
        })
    }
}