import { OpenSearchClientBuilder } from './open-search-client-builder.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Client } from '@opensearch-project/opensearch';
import { MockedOpenSearchConfigService } from '../../../test/mocks/services/openSearch/mock.openSearch-config-service';

describe('OpenSearchClientBuilderService', () => {
  let openSearchClientBuilder: OpenSearchClientBuilder;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenSearchClientBuilder, MockedOpenSearchConfigService],
    }).compile();

    openSearchClientBuilder = module.get(OpenSearchClientBuilder);
  });

  it('should build client', () => {
    // Expectations
    MockedOpenSearchConfigService.useValue.get.mockReturnValue(
      'https://api.opensearch.com/v1',
    );

    // Actions
    const actual = openSearchClientBuilder.make();

    // Assertion
    expect(actual).toBeInstanceOf(Client);
  });
});
