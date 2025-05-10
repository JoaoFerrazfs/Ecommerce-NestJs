import { OpenSearchService } from './opensearch.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from '../controllers/opensearch.controller';
import { Search_RequestBody } from '@opensearch-project/opensearch/api';
import { MockedOpenSearchClientBuilder } from '../../../test/mocks/services/mock.openSearchClient-builder';
import { MockedOpenSearchClient } from '../../../test/mocks/services/mock.openSearch.client';
import { CreateIndexDto } from '../dto/create-index.dto';
import { UnprocessableEntityException } from '@nestjs/common';

describe('OpenSearchService', () => {
  let openSearchService: OpenSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [MockedOpenSearchClientBuilder, OpenSearchService],
    }).compile();

    openSearchService = module.get(OpenSearchService);
  });

  it('should search all results from index', async () => {
    // Set
    const body = { query: { match_all: {} } } as Search_RequestBody;

    // Actions
    const actual = await openSearchService.search('products', body);

    // Assertion
    expect(actual).toStrictEqual({ result: 'something' });
    expect(MockedOpenSearchClient.useValue.search).toBeCalledWith({
      body: { query: { match_all: {} } },
      index: 'products',
    });
  });

  it('should throw error while searching for data in index', async () => {
    // Set
    const body = { query: { match_all: {} } } as Search_RequestBody;
    MockedOpenSearchClient.useValue.search.mockRejectedValue(
      new Error('some error'),
    );

    // Actions
    const actual = openSearchService.search('products', body);

    // Assertion
    await expect(actual).rejects.toEqual(
      new Error('Error executing search: some error'),
    );
  });

  it('should create index', async () => {
    // Set
    const body = new CreateIndexDto();
    body.index = 'products';
    body.properties = {
      name: { type: 'text' },
    };

    const expectedParams = {
      index: body.index,
      body: {
        mappings: {
          properties: body.properties,
        },
      },
    };

    // Actions
    const actual = await openSearchService.createIndex(body);

    // Assertion
    expect(actual).toBeTruthy();
    expect(MockedOpenSearchClient.useValue.indices.create).toBeCalledWith(
      expectedParams,
    );
  });

  it('should not create a duplicated index', async () => {
    // Set
    const body = new CreateIndexDto();
    body.index = 'products';
    body.properties = {
      name: { type: 'text' },
    };

    const error = {
      meta: {
        body: {
          error: {
            type: 'resource_already_exists_exception',
          },
        },
      },
    };

    // Expectations
    MockedOpenSearchClient.useValue.indices.create.mockRejectedValue(error);

    // Actions
    const actual = openSearchService.createIndex(body);

    // Assertion
    await expect(actual).rejects.toEqual(
      new UnprocessableEntityException(
        'Error executing createIndex: index products already exists',
      ),
    );
  });

  it('should not create a index', async () => {
    // Set
    const body = new CreateIndexDto();
    body.index = 'products';
    body.properties = {
      name: { type: 'text' },
    };

    const error = {
      message: 'some error',
    };

    // Expectations
    MockedOpenSearchClient.useValue.indices.create.mockRejectedValue(error);

    // Actions
    const actual = openSearchService.createIndex(body);

    // Assertion
    await expect(actual).rejects.toEqual(
      new UnprocessableEntityException(
        'Error executing createIndex: some error',
      ),
    );
  });
});
