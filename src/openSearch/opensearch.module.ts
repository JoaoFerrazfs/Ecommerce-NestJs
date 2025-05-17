import { Module } from '@nestjs/common';
import { SearchController } from './controllers/opensearch.controller';
import { OpenSearchService } from './services/opensearch.service';
import { OpenSearchClientBuilder } from './clients/open-search-client-builder.service';
import { OpenSearchMapper } from './services/mappers/open-search-mapper.service';
import { SimpleSearchQueryBuilder } from './services/queryBuilder/simple-search.query-builder';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [SearchController],
  providers: [
    OpenSearchService,
    OpenSearchClientBuilder,
    OpenSearchMapper,
    SimpleSearchQueryBuilder,
    ConfigService,
  ],
  exports: [OpenSearchService, ConfigService],
})
export class OpenSearchModule {}
