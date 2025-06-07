import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { OpenSearchService } from '../services/opensearch.service';
import { CreateIndexDto } from '../dto/create-index.dto';
import { CreateIndex, GeneralSearch } from '../oas/openSearch.oas';
import { OpenSearchMapper } from '../services/mappers/open-search-mapper.service';
import { SearchByTextDto } from '../dto/search-by-text.dto';
import { RuntimeException } from '@nestjs/core/errors/exceptions';

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
  async searchByText(@Body() { index, text, size, page }: SearchByTextDto) {
    try {
      const results = await this.openSearchService.search(
        index,
        text,
        page,
        size,
      );

      return this.opensearchMapper.mapMultipleResults(results.hits);
    } catch (error: unknown) {
      if (error instanceof RuntimeException) {
        throw new BadGatewayException(error.message);
      }
      throw new BadGatewayException('Unknown error happened');
    }
  }

  @Post('index')
  @HttpCode(204)
  @CreateIndex()
  async create(@Body() createIndexDto: CreateIndexDto): Promise<boolean> {
    await this.openSearchService.createIndex(createIndexDto);
    return;
  }
}
