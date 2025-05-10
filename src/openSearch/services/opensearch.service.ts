import {
  Injectable,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { CreateIndexDto } from '../dto/create-index.dto';
import { OpenSearchClientBuilder } from '../clients/open-search-client-builder.service';
import { Client } from '@opensearch-project/opensearch';
import { Search_RequestBody } from '@opensearch-project/opensearch/api';

@Injectable()
export class OpenSearchService {
  private readonly client: Client;

  constructor(
    private readonly openSearchClientBuilder: OpenSearchClientBuilder,
  ) {
    this.client = this.openSearchClientBuilder.make();
  }

  async search(index: string, body: Search_RequestBody) {
    try {
      const result = await this.client.search({
        index,
        body,
      });
      return result.body;
    } catch (error) {
      throw new Error(`Error executing search: ${error.message}`);
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
}
