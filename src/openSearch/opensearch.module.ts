import { Module } from '@nestjs/common';
import { SearchController } from './controllers/opensearch.controller';
import { OpenSearchService } from './services/opensearch.service';
import { OpenSearchClientBuilder } from './clients/open-search-client-builder.service';
import { OpensearchMapper } from './services/transformers/opensearch.mapper';

@Module({
  controllers: [SearchController],
  providers: [OpenSearchService, OpenSearchClientBuilder, OpensearchMapper],
  exports: [OpenSearchClientBuilder],
})
export class OpenSearchModule {}
