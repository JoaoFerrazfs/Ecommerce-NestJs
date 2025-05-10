import { OpenSearchClientBuilder } from './open-search-client-builder.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MockedConfigService } from '../../../test/mocks/services/mock.config-service';
import { Client } from '@opensearch-project/opensearch';

describe('OpenSearchClientBuilderService', () => {
  let openSearchClientBuilder: OpenSearchClientBuilder;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenSearchClientBuilder, MockedConfigService],
    }).compile();

    openSearchClientBuilder = module.get(OpenSearchClientBuilder);
  });

  it('should build client', () => {
    // Expectations
    MockedConfigService.useValue.get.mockReturnValue(
      'https://api.opensearch.com/v1',
    );

    // Actions
    const actual = openSearchClientBuilder.make();

    // Assertion
    expect(actual).toBeInstanceOf(Client);
    expect(MockedConfigService.useValue.get).toBeCalledWith(
      'OPENSEARCH_CONNECTION_STRING',
    );
  });
});
