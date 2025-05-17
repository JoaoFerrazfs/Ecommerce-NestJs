import {
  Injectable,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { CreateIndexDto } from '../dto/create-index.dto';
import { OpenSearchClientBuilder } from '../clients/open-search-client-builder.service';
import { Client } from '@opensearch-project/opensearch';
import { SimpleSearchQueryBuilder } from './queryBuilder/simple-search.query-builder';
import { Product } from '../../products/entities/product.entity';
import { ResponseItem } from '@opensearch-project/opensearch/api/_types/_core.bulk';
import { Bulk_RequestBody } from '@opensearch-project/opensearch/api/_core/bulk';
import { RuntimeException } from '@nestjs/core/errors/exceptions';

@Injectable()
export class OpenSearchService {
  private readonly client: Client;

  constructor(
    private readonly openSearchClientBuilder: OpenSearchClientBuilder,
    private readonly simpleSearchQueryBuilder: SimpleSearchQueryBuilder,
  ) {
    this.client = this.openSearchClientBuilder.make();
  }

  async search(
    index: string,
    text: string = null,
    page: number = 1,
    size: number = 10,
  ) {
    try {
      return (
        await this.client.search(
          this.simpleSearchQueryBuilder.findContentByText(
            index,
            text,
            page,
            size,
          ),
        )
      ).body;
    } catch (error) {
      throw new RuntimeException(`Error executing search: ${error.message}`);
    }
  }

  async createIndex({ index, properties }: CreateIndexDto): Promise<boolean> {
    try {
      await this.client.indices.create({
        index,
        body: {
          mappings: {
            properties,
          },
        },
      });
    } catch (error: any) {
      if (
        error?.meta?.body?.error?.type === 'resource_already_exists_exception'
      ) {
        throw new UnprocessableEntityException(
          `Error executing createIndex: index ${index} already exists`,
        );
      }

      throw new BadRequestException(
        `Error executing createIndex: ${error.message}`,
      );
    }

    return true;
  }

  async bulkIndex(
    index: string,
    entities: Product[],
  ): Promise<Record<string, ResponseItem>[]> {
    const body = entities.flatMap(function (entity): Bulk_RequestBody {
      delete entity._id;

      return [{ index: { _index: index, _id: entity.cod } }, entity];
    });

    try {
      const result = await this.client.bulk({
        refresh: true,
        body,
      });

      if (result.body.errors) {
        throw new BadRequestException('Erro ao indexar alguns produtos.');
      }

      return result.body.items;
    } catch (error: any) {
      throw new BadRequestException(
        `Erro ao indexar produtos: ${error.message}`,
      );
    }
  }
}
