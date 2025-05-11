import { Test, TestingModule } from '@nestjs/testing';
import { OpenSearchMapper } from './open-search-mapper.service';
import { HitsMetadata } from '@opensearch-project/opensearch/api/_types/_core.search';
import { mockedProduct } from '../../../../test/mocks/entities/mock.product.entity';
import { MockedOpenSearchClientBuilder } from '../../../../test/mocks/services/openSearch/mock.openSearchClient-builder';
import { OpenSearchService } from '../opensearch.service';
import { MockedOpenSearchMapper } from '../../../../test/mocks/services/openSearch/mock.openSearch-mapper';
import { MockedSimpleSearchQueryBuilder } from '../../../../test/mocks/services/openSearch/mock.openSearch-queryBuilder';

describe('OpenSearchMapper', () => {
  let openSearchMapper: OpenSearchMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MockedOpenSearchClientBuilder,
        OpenSearchService,
        MockedOpenSearchMapper,
        MockedSimpleSearchQueryBuilder,
      ],
    }).compile();

    openSearchMapper = module.get(OpenSearchMapper);
  });

  it('should search all results from index', () => {
    // Set
    const payload = {
      hits: [{ _index: 'products', _source: mockedProduct, _id: 'someId' }],
    } as HitsMetadata;

    // Actions
    const actual = openSearchMapper.mapMultipleResults(payload);

    // Assertion
    expect(actual).toStrictEqual([mockedProduct]);
  });
});
