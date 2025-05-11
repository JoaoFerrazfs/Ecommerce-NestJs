import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './opensearch.controller';
import { CreateIndexDto } from '../dto/create-index.dto';
import {
  MockedOpenSearchService,
  SEARCH_RESULT,
} from '../../../test/mocks/services/openSearch/mock.openSearch-service';
import { MockedOpenSearchMapper } from '../../../test/mocks/services/openSearch/mock.openSearch-mapper';
import { SearchByTextDto } from '../dto/search-by-text.dto';

describe('OpenSearchController', () => {
  let searchController: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [MockedOpenSearchService, MockedOpenSearchMapper],
    }).compile();

    searchController = module.get(SearchController);
  });

  it('should search all data in the index', async () => {
    // Set
    const expected = [
      {
        images: [{ alt: 'escada', name: 'image', path: 'https://image.jpg' }],
        name: 'escada',
        price: 19.99,
        unit: 'kg',
      },
    ];

    // Actions
    const actual = await searchController.searchAll('test');

    // Assertion
    expect(MockedOpenSearchService.useValue.search).toBeCalledWith('test');

    expect(actual).toEqual(expected);
  });

  it('should create a index', async () => {
    // Set
    const payload = new CreateIndexDto();
    payload.index = 'test';
    payload.properties = { test: { type: 'text' } };

    // Actions
    await searchController.create(payload);

    // Assertion
    expect(MockedOpenSearchService.useValue.createIndex).toBeCalledWith(
      payload,
    );
  });

  it('should search by text', async () => {
    // Set
    const payload = new SearchByTextDto();
    payload.index = 'test';
    payload.text = 'escada';

    // Actions
    await searchController.searchByText(payload);

    // Assertion
    expect(MockedOpenSearchService.useValue.search).toBeCalledWith(
      'test',
      'escada',
    );

    expect(MockedOpenSearchMapper.useValue.mapMultipleResults).toBeCalledWith(
      SEARCH_RESULT.hits,
    );
  });
});
