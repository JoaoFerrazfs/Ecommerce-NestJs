import { Unit } from '../enums/unit-enum';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty({ message: 'O cod é um campo obrigatório' })
  @Min(10000000, { message: 'O cod deve ter pelo menos 8 dígitos.' })
  @IsNumber({}, { message: 'O cod deve ser um number.' })
  cod: number;

  @MinLength(3, { message: 'O name precisa ter no mínimo 3 letras' })
  @IsNotEmpty({ message: 'O name é um campo obrigatório' })
  name: string;

  @IsOptional()
  @MinLength(10, { message: 'O description precisa ter no mínimo 10 letras' })
  description: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O price deve ter no máximo 2 casas decimais.' },
  )
  @IsNotEmpty({ message: 'O price é um campo obrigatório' })
  @IsPositive()
  @Min(0.01)
  price: number;

  @IsNotEmpty({ message: 'O stock é um campo obrigatório' })
  @Transform(({ value }) => parseFloat(value))
  @IsPositive()
  @Min(0.01)
  stock: number;

  @IsEnum(Unit, {
    message:
      'O campo unit deve ser igual a um dos valores a seguir: kg, L, un, m',
  })
  @IsNotEmpty({ message: 'O unit é um campo obrigatório' })
  unit: Unit;
}
