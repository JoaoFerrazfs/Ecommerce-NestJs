import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { OpenSearchService } from '../services/opensearch.service';
import { CreateIndexDto } from '../dto/create-index.dto';
import { CreateIndex, GeneralSearch } from '../oas/openSearch.oas';
import { OpenSearchMapper } from '../services/mappers/open-search-mapper.service';
import { SearchByTextDto } from '../dto/search-by-text.dto';

@Controller('api/opensearch')
export class SearchController {
  constructor(
    private readonly openSearchService: OpenSearchService,
    private readonly opensearchMapper: OpenSearchMapper,
  ) {}

  @Get('/:index')
  @GeneralSearch()
  async searchAll(@Param('index') index: string) {
    const results = await this.openSearchService.search(index);

    return this.opensearchMapper.mapMultipleResults(results.hits);
  }

  @Post('/searchByText')
  @GeneralSearch()
  async searchByText(@Body() { index, text }: SearchByTextDto) {
    const results = await this.openSearchService.search(index, text);

    return this.opensearchMapper.mapMultipleResults(results.hits);
  }

  @Post('index')
  @HttpCode(204)
  @CreateIndex()
  async create(@Body() createIndexDto: CreateIndexDto): Promise<boolean> {
    await this.openSearchService.createIndex(createIndexDto);
    return;
  }
}
