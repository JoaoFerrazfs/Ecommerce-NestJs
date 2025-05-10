import { Injectable } from '@nestjs/common';
import { Search_ResponseBody } from '@opensearch-project/opensearch/api';
import { Hit } from '@opensearch-project/opensearch/api/_types/_core.search';
import { ProductMapper } from './entities/Products';
import { BaseEntity } from 'typeorm';

const mappers = {
  products: new ProductMapper(),
};

interface IndexMap {
  products: ProductMapper;
}

export interface IndexMapInterface {
  map(data: any): BaseEntity;
}

@Injectable()
export class OpensearchMapper {
  public mapMultipleResults({ hits }: Search_ResponseBody): object[]  {
    const results = hits.hits;
    if (!results) return [];

    return results.map(function(result: Hit): object {
      const index = result._index as keyof IndexMap;
      return mappers[index].map(result._source);
    });
  }
}
