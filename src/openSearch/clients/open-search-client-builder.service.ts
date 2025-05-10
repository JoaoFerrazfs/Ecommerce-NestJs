import { ConfigService } from '@nestjs/config';
import { Client } from '@opensearch-project/opensearch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenSearchClientBuilder {
  constructor(private readonly configService: ConfigService) {}

  public make(): Client {
    return new Client({
      node: this.configService.get('OPENSEARCH_CONNECTION_STRING'),
    });
  }
}
