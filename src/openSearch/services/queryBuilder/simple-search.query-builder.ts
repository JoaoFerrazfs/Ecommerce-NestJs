import { Injectable } from '@nestjs/common';
import { Search_Request } from '@opensearch-project/opensearch/api';

@Injectable()
export class SimpleSearchQueryBuilder {
  findContentByText(index: string, text: string | null): Search_Request {
    if (!text) return { index };

    return {
      index,
      body: {
        query: {
          match: {
            name: {
              query: text,
              fuzziness: 1,
            },
          },
        },
      },
    };
  }
}
