import { IsEmpty, IsNotEmpty, IsString, IsUrl, Contains } from 'class-validator';

export class createVideoDTO {
    @IsEmpty()
    id: number;
    
    @IsString({ message: 'O titulo deve ser uma string' })
    @IsNotEmpty({ message: 'O titulo não pode ser vazio' })
    title: string;

    @IsString({ message: 'A descrição deve ser uma string' })
    @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
    description: string;

    @IsString()
    @IsNotEmpty({ message: 'A url não pode ser vazia' })
    @IsUrl()
    @Contains('youtube.com', { message: 'A url deve ser do youtube' })
    url: string;
}