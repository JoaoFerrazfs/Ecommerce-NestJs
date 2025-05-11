import { OpenSearchService } from '../../../../src/openSearch/services/opensearch.service';
import { mockedProduct } from '../../entities/mock.product.entity';

export const SEARCH_RESULT = {
  hits: { hits: { mockedProduct } },
};

export const MockedOpenSearchService = {
  provide: OpenSearchService,
  useValue: {
    search: jest.fn().mockResolvedValue(SEARCH_RESULT),
    createIndex: jest.fn().mockResolvedValue(true),
  },
};
