import { Injectable, Inject } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';

@Injectable()
export class OpenSearchService {
  constructor(@Inject('OPENSEARCH_CLIENT') private readonly client: Client) {}

  async search(index: string, body: any) {
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

  async createIndex(indexName: string) {
    return this.client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            name: { type: 'text' },
            price: { type: 'float' },
            updatedAt: { type: 'date' },
          },
        },
      },
    });

    // Outros métodos para interagir com o OpenSearch
  }
}
