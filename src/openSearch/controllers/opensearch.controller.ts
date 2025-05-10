import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { OpenSearchService } from '../services/opensearch.service';
import { CreateIndexDto } from '../dto/create-index.dto';
import { CreateIndex, GeneralSearch } from '../oas/openSearch.oas';
import { OpenSearchMapper } from '../services/mappers/open-search-mapper.service';

@Controller('api/opensearch')
export class SearchController {
  constructor(
    private readonly openSearchService: OpenSearchService,
    private readonly opensearchMapper: OpenSearchMapper,
  ) {}

  @Get('/:index')
  @GeneralSearch()
  async searchAll(@Param('index') index: string) {
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
