import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBodyOptions,
  ApiParam,
  ApiParamOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';

const idParam = {
  name: 'id',
  type: String,
  description: 'ID of the content',
  example: '677ecdf5b0b5e2594e8e562d',
} as ApiParamOptions;

export function CreateContent() {
  return applyDecorators(
    ApiBody({
      schema: {
        type: 'object',
        required: ['name', 'banners'],
        properties: {
          name: { type: 'string', example: 'Melhores ofertas' },
          banners: {
            type: 'array',
            description: 'The photo to upload',
            example: ['677ec5eeb8fc6b91ab73fede'],
          },
        },
      },
    } as ApiBodyOptions),
    ApiResponse({
      status: 201,
      schema: {
        required: ['data'],
        properties: {
          data: {
            type: 'object',
            required: ['_id', 'name', 'banners'],
            properties: {
              _id: { type: 'string', example: '677ecdf5b0b5e2594e8e562d' },
              name: { type: 'string', example: 'Melhores ofertas' },
              banners: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['title', 'image'],
                  properties: {
                    _id: {
                      type: 'string',
                      example: '677ecdf5b0b5e2594e8e562d',
                    },
                    title: { type: 'string', example: 'Melhores ofertas' },
                    image: { type: 'string', example: 'https://image.com' },
                  },
                },
              },
            },
          },
        },
      },
    } as ApiResponseOptions),
  );
}

export function ListContents() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      schema: {
        required: ['data'],
        properties: {
          data: {
            type: 'array',
            items: {
              required: ['_id', 'name', 'banners'],
              properties: {
                _id: { type: 'string', example: '677ecdf5b0b5e2594e8e562d' },
                name: { type: 'string', example: 'Melhores ofertas' },
                banners: {
                  type: 'array',
                  items: {
                    type: 'object',
                    required: ['title', 'image'],
                    properties: {
                      _id: {
                        type: 'string',
                        example: '677ecdf5b0b5e2594e8e562d',
                      },
                      title: { type: 'string', example: 'Melhores ofertas' },
                      image: { type: 'string', example: 'https://image.com' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    } as ApiResponseOptions),
  );
}

export function FindContent() {
  return applyDecorators(
    ApiParam(idParam),
    ApiResponse({
      status: 200,
      schema: {
        required: ['data'],
        properties: {
          data: {
            type: 'object',
            required: ['_id', 'name', 'banners'],
            properties: {
              _id: { type: 'string', example: '677ecdf5b0b5e2594e8e562d' },
              name: { type: 'string', example: 'Melhores ofertas' },
              banners: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['title', 'image'],
                  properties: {
                    _id: {
                      type: 'string',
                      example: '677ecdf5b0b5e2594e8e562d',
                    },
                    title: { type: 'string', example: 'Melhores ofertas' },
                    image: { type: 'string', example: 'https://image.com' },
                  },
                },
              },
            },
          },
        },
      },
    } as ApiResponseOptions),
  );
}

export function UpdateContent() {
  return applyDecorators(
    ApiParam(idParam),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Melhores ofertas' },
          banners: {
            type: 'array',
            description: 'The photo to upload',
            example: ['677ec5eeb8fc6b91ab73fede'],
          },
        },
      },
    } as ApiBodyOptions),
    ApiResponse({
      status: 200,
      schema: {
        required: ['data'],
        properties: {
          data: {
            type: 'object',
            required: ['_id', 'name', 'banners'],
            properties: {
              _id: { type: 'string', example: '677ecdf5b0b5e2594e8e562d' },
              name: { type: 'string', example: 'Melhores ofertas' },
              banners: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['title', 'image'],
                  properties: {
                    _id: {
                      type: 'string',
                      example: '677ecdf5b0b5e2594e8e562d',
                    },
                    title: { type: 'string', example: 'Melhores ofertas' },
                    image: { type: 'string', example: 'https://image.com' },
                  },
                },
              },
            },
          },
        },
      },
    } as ApiResponseOptions),
  );
}

export function DeleteContent() {
  return applyDecorators(
    ApiParam(idParam),
    ApiResponse({ status: 204 } as ApiResponseOptions),
  );
}
