import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { OpenSearchService } from '../services/opensearch.service';
import { CreateIndexDto } from '../dto/create-index.dto';
import { CreateIndex, GeneralSearch } from '../oas/openSearch.oas';
import { OpensearchMapper } from '../services/transformers/opensearch.mapper';

@Controller('api/opensearch')
export class SearchController {
  constructor(
    private readonly openSearchService: OpenSearchService,
    private readonly opensearchMapper: OpensearchMapper,
  ) {}

  @Get('/:index')
  @GeneralSearch()
  async search(@Param('index') index: string) {
    const query = {
      query: {
        match_all: {},
      },
    };

    const results = await this.openSearchService.search(index, query);

    return this.opensearchMapper.mapMultipleResults(results);
  }

  @Post('index')
  @HttpCode(204)
  @CreateIndex()
  async create(@Body() createIndexDto: CreateIndexDto): Promise<boolean> {
    await this.openSearchService.createIndex(createIndexDto);
    return;
  }
}
