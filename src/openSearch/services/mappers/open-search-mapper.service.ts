import { Injectable } from '@nestjs/common';
import {
  Hit,
  HitsMetadata,
} from '@opensearch-project/opensearch/api/_types/_core.search';
import { BaseEntity } from 'typeorm';
import { ENTITY_MAPPERS } from './opensearch-list.mappers';

@Injectable()
export class OpenSearchMapper {
  public mapMultipleResults({
    hits,
  }: HitsMetadata): { results: BaseEntity[]; count: number } | [] {
    if (!hits) return [];

    const results = hits.map(function (result: Hit): BaseEntity {
      const index = result._index;
      return ENTITY_MAPPERS[index].map(result._source);
    });

    return {
      count: results.length,
      results,
    };
  }
}
