import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiNoContentResponse, ApiParam } from '@nestjs/swagger';

export function CreateIndex() {
  return applyDecorators(
    ApiBody({
      schema: {
        type: 'object',
        required: ['index', 'properties'],
        properties: {
          index: {
            type: 'string',
            example: 'products',
          },
          properties: {
            type: 'object',
            additionalProperties: {
              properties: {
                type: {
                  type: 'string',
                  example: 'text',
                },
              },
            },
          },
        },
      },
    }),
    ApiNoContentResponse(),
  );
}

export function GeneralSearch() {
  return applyDecorators(
    ApiParam({
      name: 'index',
      type: String,
      example: 'products',
    }),
  );
}
