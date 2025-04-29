import { IsOptional, IsString } from 'class-validator'

export class UpdateTodoDto {
    @IsOptional()
    @IsString()
    titulo?: string

    @IsOptional()
    @IsString()
    descricao?: string

    @IsOptional()
    @IsString()
    data?: string
}