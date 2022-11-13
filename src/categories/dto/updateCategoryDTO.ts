import { IsEmpty, IsNotEmpty, IsString, IsUrl, Contains, IsOptional } from 'class-validator';

export class updateCategoryDTO {

    @IsEmpty()
    id: number;

    @IsString({ message: 'O titulo deve ser uma string' })
    @IsNotEmpty({ message: 'O titulo não pode ser vazio' })
    title: string;

    @IsString({ message: 'A cor deve ser uma string' })
    @IsNotEmpty({ message: 'A cor não pode ser nula/vazia' })
    color: string;
}
