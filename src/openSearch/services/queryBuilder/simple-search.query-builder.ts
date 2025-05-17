import { Injectable } from '@nestjs/common';
import { Search_Request } from '@opensearch-project/opensearch/api';

@Injectable()
export class SimpleSearchQueryBuilder {
  findContentByText(
    index: string,
    text: string | null,
    page: number = 1,
    size: number = 100,
  ): Search_Request {
    if (!text) return { index };

    return {
      index,
      body: {
        from: page,
        size: size,
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
