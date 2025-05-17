import { OpenSearchService } from '../../../../src/openSearch/services/opensearch.service';
import { mockedProduct } from '../../entities/mock.product.entity';
import { ResponseItem } from '@opensearch-project/opensearch/api/_types/_core.bulk';

export const SEARCH_RESULT = {
  hits: { hits: { mockedProduct } },
};

const responseItem = [
  {
    index: {
      _index: 'products',
      _id: '88888888',
      _version: 46,
      result: 'updated',
      forced_refresh: true,
      _shards: [{}],
      _seq_no: 5397,
      _primary_term: 8,
      status: 200,
    },
  },
];

export const MockedOpenSearchService = {
  provide: OpenSearchService,
  useValue: {
    search: jest.fn().mockResolvedValue(SEARCH_RESULT),
    createIndex: jest.fn().mockResolvedValue(true),
    bulkIndex: jest.fn().mockResolvedValue(responseItem),
  },
};
