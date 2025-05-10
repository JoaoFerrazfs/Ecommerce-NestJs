import { IsNotEmpty } from 'class-validator';
import { Property } from '@opensearch-project/opensearch/api/_types/_common.mapping';

export class CreateIndexDto {
  @IsNotEmpty({ message: 'O index é um campo obrigatório' })
  index: string;

  @IsNotEmpty({ message: 'O mappings é um campo obrigatório' })
  properties: Record<string, Property>;
}
