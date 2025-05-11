import { Module } from '@nestjs/common';
import { SearchController } from './controllers/opensearch.controller';
import { OpenSearchService } from './services/opensearch.service';
import { OpenSearchClientBuilder } from './clients/open-search-client-builder.service';
import { OpenSearchMapper } from './services/mappers/open-search-mapper.service';
import { SimpleSearchQueryBuilder } from './services/queryBuilder/simple-search.query-builder';

@Module({
  controllers: [SearchController],
  providers: [
    OpenSearchService,
    OpenSearchClientBuilder,
    OpenSearchMapper,
    SimpleSearchQueryBuilder,
  ],
  exports: [OpenSearchClientBuilder],
})
export class OpenSearchModule {}
