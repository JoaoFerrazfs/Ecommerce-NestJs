import { IsNotEmpty } from 'class-validator';

export class RemoveImageError {
  @IsNotEmpty({ message: 'O name é um campo obrigatório' })
  name: string;
}
