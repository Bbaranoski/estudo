import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() data: RegisterDto) {
        const user = await this.authService.register(data)
        return {
            message: 'Usuário registrado com sucesso',
            user,
        }
    }

    @Post('login')
    async login(@Body() data: LoginDto) {
        const user = await this.authService.validateUser(data.email, data.password)

        const toeknObj = await this.authService.login({
            id: user.id,
            email: user.email,
        })

        return {
            message: 'Login realizado com sucesso',
            acess_token: toeknObj.access_token,
            expires_in: toeknObj.expires_in,
        }
    }
}
