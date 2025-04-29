import { IsString, IsNotEmpty }  from 'class-validator'

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    titulo:string

    @IsString()
    @IsNotEmpty()
    descricao: string

    @IsString()
    @IsNotEmpty()
    data: string
}