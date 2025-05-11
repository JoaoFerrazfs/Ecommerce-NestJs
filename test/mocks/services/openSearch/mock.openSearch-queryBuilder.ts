import { SimpleSearchQueryBuilder } from '../../../../src/openSearch/services/queryBuilder/simple-search.query-builder';

export const BUILT_QUERY = {
  index: 'products',
  body: {
    query: {
      match: {
        name: {
          query: 'text',
          fuzziness: 1,
        },
      },
    },
  },
};

export const MockedSimpleSearchQueryBuilder = {
  provide: SimpleSearchQueryBuilder,
  useValue: {
    findContentByText: jest.fn().mockReturnValue(BUILT_QUERY),
  },
};
