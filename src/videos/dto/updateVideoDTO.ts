import { IsEmpty, IsNotEmpty, IsString, IsUrl, Contains, IsOptional, IsNumber } from 'class-validator';

export class updateVideoDTO {

    @IsEmpty()
    id: number;

    @IsString({ message: 'O titulo deve ser uma string' })
    @IsNotEmpty({ message: 'O titulo não pode ser vazio' })
    @IsOptional()
    title: string;

    @IsString({ message: 'A descrição deve ser uma string' })
    @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty({ message: 'A url não pode ser vazia' })
    @IsUrl()
    @Contains('youtube.com', { message: 'A url deve ser do youtube' })
    @IsOptional()
    url: string;

    @IsNumber()
    @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
    @IsOptional()
    categoryId: number;

}
