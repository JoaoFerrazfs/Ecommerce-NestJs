import { IsInt, IsNotEmpty, Length, Min } from 'class-validator';

export class SearchByTextDto {
  @IsNotEmpty({ message: 'O index é um campo obrigatório' })
  index: string;

  @IsNotEmpty({ message: 'O text é um campo obrigatório' })
  @Length(3)
  text: string;

  @IsInt({ message: 'O page precisar ser inteiro' })
  @Min(1, { message: 'O page precisar ser maior que 1' })
  @IsNotEmpty({ message: 'O page é um campo obrigatório' })
  page: number;

  @IsInt({ message: 'O size precisar ser inteiro' })
  @Min(1, { message: 'O size precisar ser maior que 1' })
  @IsNotEmpty({ message: 'O size é um campo obrigatório' })
  size: number;
}
