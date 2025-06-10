import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/todo/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async register(data: RegisterDto) {
        //valida o email
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email }
        })
        if (existingUser) {
            throw new BadRequestException('Email já cadastrado')
        }
        //cria hash na senha
        const hashedPassword = await bcrypt.hash(data.password, 10)
        //cria o usuario no banco
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        })

        const { password, ...userWithoutPassword } = user
        return userWithoutPassword
    }

    async validateUser(email: string, password: string) {
        //valida o email
        const user = await this.prisma.user.findUnique({
            where: { email },
        })
        if(!user){
            throw new UnauthorizedException('Usuário não encontrado')
        }
        //valida a senha
        const passwordValid = await bcrypt.compare(password, user.password)
        if(!passwordValid){
            throw new UnauthorizedException('Senha incorreta')
        }

        const { password: _, ...userWithoutPassword } = user
        return userWithoutPassword
    }

    async login(user: { id: string; email: string }){
        const payload = { sub: user.id, email: user.email }

        const token = await this.jwtService.signAsync(payload)
        return{
            access_token: token,
            expires_in: '1h',
        }
    }
}
