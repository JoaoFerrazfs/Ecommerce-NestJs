import { OpenSearchService } from '../../../src/openSearch/services/opensearch.service';

export const MockedOpenSearchService = {
  provide: OpenSearchService,
  useValue: {
    search: jest.fn(),
    createIndex: jest.fn().mockResolvedValue(true),
  },
};
