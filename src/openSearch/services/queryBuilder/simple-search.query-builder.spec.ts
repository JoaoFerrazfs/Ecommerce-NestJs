import { Test, TestingModule } from '@nestjs/testing';
import { SimpleSearchQueryBuilder } from './simple-search.query-builder';

describe('SimpleSearchQueryBuilder', () => {
  let simpleSearchQueryBuilder: SimpleSearchQueryBuilder;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimpleSearchQueryBuilder],
    }).compile();

    simpleSearchQueryBuilder = module.get(SimpleSearchQueryBuilder);
  });

  it('should build query', () => {
    // Set
    const index = 'products';
    const text = 'escada';
    const expected = {
      body: {
        from: 0,
        query: {
          match: {
            name: {
              fuzziness: 'AUTO',
              query: 'escada',
            },
          },
        },
        size: 100,
      },
      index: 'products',
    };

    // Actions
    const actual = simpleSearchQueryBuilder.findContentByText(index, text);

    // Expectations
    expect(actual).toEqual(expected);
  });
});
