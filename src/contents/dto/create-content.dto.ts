import { IsArray, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty({ message: 'O campo é name é um campo obrigatório' })
  @MinLength(3, { message: 'O campo name precisa ter no mínimo 3 letras' })
  name: string;

  @IsNotEmpty({ message: 'O campo modules é um campo obrigatório' })
  @IsArray({ message: 'O campo modules é um campo array de ids' })
  @Matches(/^[a-f\d]{24}$/i, {
    each: true,
    message:
      'Cada item de modules deve ser um ObjectId válido do MongoDB (24 caracteres hexadecimais)',
  })
  modules: string[];
}
