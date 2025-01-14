import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBodyOptions,
  ApiConsumes,
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

export function UpdateContent() {
  return applyDecorators(
    ApiParam(idParam),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Melhores ofertas' },
          photo: {
            type: 'string',
            format: 'binary',
            description: 'The photo to upload',
          },
        },
      },
    } as ApiBodyOptions),
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
            properties: {
              _id: { type: 'string', example: '677ecdf5b0b5e2594e8e562d' },
              title: { type: 'string', example: 'Melhores ofertas' },
              image: { type: 'string', example: 'https://placehold.it' },
            },
          },
        },
      },
    } as ApiResponseOptions),
    ApiResponse({
      status: 404,
    } as ApiResponseOptions),
  );
}

export function CreateContent() {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: ['title', 'photo'],
        properties: {
          title: { type: 'string', example: 'Melhores ofertas' },
          photo: {
            type: 'string',
            format: 'binary',
            description: 'The photo to upload',
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
            required: ['_id', 'title', 'image'],
            properties: {
              _id: { type: 'string', example: '677ecdf5b0b5e2594e8e562d' },
              title: { type: 'string', example: 'Melhores ofertas' },
              image: { type: 'string', example: 'https://placehold.it' },
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
    ApiResponse({
      status: 204,
    } as ApiResponseOptions),
    ApiResponse({
      status: 400,
      example: 'Não foi possivel realizar a deleção',
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
              type: 'object',
              required: ['_id', 'title', 'image'],
              properties: {
                _id: { type: 'string', example: '677ecdf5b0b5e2594e8e562d' },
                title: { type: 'string', example: 'Melhores ofertas' },
                image: { type: 'string', example: 'https://placehold.it' },
              },
            },
          },
        },
      },
    } as ApiResponseOptions),
    ApiResponse({
      status: 404,
    } as ApiResponseOptions),
  );
}
