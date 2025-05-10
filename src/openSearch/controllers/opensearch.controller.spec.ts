import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './opensearch.controller';
import { MockedOpenSearchService } from '../../../test/mocks/services/mock.openservice-service';
import { CreateIndexDto } from '../dto/create-index.dto';

describe('OpenSearchController', () => {
  let searchController: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [MockedOpenSearchService],
    }).compile();

    searchController = module.get(SearchController);
  });

  it('should search all data in the index', async () => {
    // Actions
    await searchController.search('test');

    // Assertion
    expect(MockedOpenSearchService.useValue.search).toBeCalledWith('test', {
      query: { match_all: {} },
    });
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
