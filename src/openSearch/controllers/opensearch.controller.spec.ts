import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './opensearch.controller';
import { CreateIndexDto } from '../dto/create-index.dto';
import { MockedOpenSearchService } from '../../../test/mocks/services/openSearch/mock.openSearch-service';
import { MockedOpenSearchMapper } from '../../../test/mocks/services/openSearch/mock.openSearch-mapper';

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
    expect(MockedOpenSearchService.useValue.search).toBeCalledWith('test', {
      query: { match_all: {} },
    });

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
});
