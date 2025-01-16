import { IsNotEmpty, IsString } from 'class-validator';

export class FindByDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo é attribute é um campo obrigatório' })
  attribute: string;

  @IsNotEmpty({ message: 'O campo é value é um campo obrigatório' })
  value: any;
}
