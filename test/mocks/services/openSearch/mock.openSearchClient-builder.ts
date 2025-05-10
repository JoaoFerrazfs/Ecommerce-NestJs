import { MockedOpenSearchClient } from './mock.openSearch.client';
import { OpenSearchClientBuilder } from '../../../../src/openSearch/clients/open-search-client-builder.service';

export const MockedOpenSearchClientBuilder = {
  provide: OpenSearchClientBuilder,
  useValue: {
    make: jest.fn().mockReturnValue(MockedOpenSearchClient.useValue),
  },
};
