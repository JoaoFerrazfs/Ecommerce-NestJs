import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateBannerDto {
  @IsNotEmpty({ message: 'O titulo é um campo obrigatório' })
  @MinLength(3, { message: 'O titulo precisa ter no mínimo 3 letras' })
  title: string;
}
