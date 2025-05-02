import { Controller, Get } from '@nestjs/common';
import { OpenSearchService } from './opensearch.service';

@Controller('open/search')
export class SearchController {
  constructor(private readonly openSearchService: OpenSearchService) {}

  @Get()
  async search() {
    const query = {
      query: {
        match_all: {},
      },
    };

    await this.openSearchService.createIndex('test');
    return await this.openSearchService.search('products', query);
  }
}
