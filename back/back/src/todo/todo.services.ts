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

    async findAll() {
        return this.prisma.todo.findMany()
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

    async filtrar(filtros: { titulo?: string, data?: string, id?: string}) {
        const where: any = {}

        if(filtros.titulo) {
            where.titulo = {
                contains: filtros.titulo,
                mode: 'insensitive',
            }
        }

        if(filtros.data) {
            where.data = filtros.data
        }

        if(filtros.id) {
            where.id = parseInt(filtros.id)
        }

        return this.prisma.todo.findMany({
            where,
        })
    }
}