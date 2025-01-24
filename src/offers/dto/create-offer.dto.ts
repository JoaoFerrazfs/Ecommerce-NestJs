import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty({ message: 'O title é um campo obrigatório' })
  @MinLength(3, { message: 'O title precisa ter no mínimo 3 letras' })
  title: string;

  @IsArray({ message: 'O campo products deve ser um array de strings' })
  @IsString({
    each: true,
    message: 'Os valores do campo products dever ser string',
  })
  @IsMongoId({
    each: true,
    message: 'Os valores do campo products devem ser object id',
  })
  @ArrayNotEmpty({ message: 'O products é um campo obrigatório' })
  products: string[];
}
