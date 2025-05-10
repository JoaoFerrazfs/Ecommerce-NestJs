import { Client } from '@opensearch-project/opensearch';

export const MockedOpenSearchClient = {
  provide: Client,
  useValue: {
    search: jest.fn().mockResolvedValue({ body: { result: 'something' } }),
    create: jest.fn(),
    indices: { create: jest.fn().mockResolvedValue(true) },
  },
};
