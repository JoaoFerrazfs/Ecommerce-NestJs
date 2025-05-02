import { Module } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';
import { SearchController } from './opensearch.controller';
import { OpenSearchService } from './opensearch.service';

@Module({
  controllers: [SearchController],
  providers: [
    OpenSearchService,
    {
      provide: 'OPENSEARCH_CLIENT',
      useFactory: () => {
        return new Client({
          node: 'http://localhost:9200', // URL do seu servidor OpenSearch
        });
      },
    },
  ],
  exports: ['OPENSEARCH_CLIENT'],
})
export class OpenSearchModule {}
