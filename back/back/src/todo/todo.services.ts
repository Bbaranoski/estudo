import { Injectable } from "@nestjs/common"
import { PrismaService } from "./prisma.service"

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService) {}

    async create(title: string) {
        return this.prisma.todo.create({
            data: {
                title,
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