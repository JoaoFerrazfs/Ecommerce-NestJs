import { IsNotEmpty, Length } from 'class-validator';

export class SearchByTextDto {
  @IsNotEmpty({ message: 'O index é um campo obrigatório' })
  index: string;

  @IsNotEmpty({ message: 'O text é um campo obrigatório' })
  @Length(3)
  text: string;
}
