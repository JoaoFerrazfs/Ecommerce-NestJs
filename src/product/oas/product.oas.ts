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
import { Unit } from '../enums/unit-enum';

const idParam = {
  name: 'id',
  type: String,
  description: 'ID of the content',
  example: '677ecdf5b0b5e2594e8e562d',
} as ApiParamOptions;

const baseProductResponse = {
  status: 200,
  schema: {
    required: ['data'],
    properties: {
      data: {
        type: 'array',
        items: {
          type: 'object',
          required: ['_id', 'cod', 'name', 'price', 'price', 'image'],
          properties: {
            _id: { type: 'string', example: '677ecdf5b0b5e2594e8e562d' },
            cod: { type: 'number', example: '88888888' },
            name: { type: 'string', example: 'escada' },
            description: { type: 'string', example: 'some description' },
            price: { type: 'number', example: '19.90', format: 'double' },
            unit: { type: 'string', example: 'un', enum: Unit },
            image: {
              type: 'array',
              items: {
                properties: {
                  alt: { type: 'string', example: 'escada' },
                  path: { type: 'string', example: 'https://placehold.it' },
                },
              },
            },
          },
        },
      },
    },
  },
};

const baseProductBody = {
  schema: {
    type: 'object',
    required: ['cod', 'name', 'price', 'price', 'image'],
    properties: {
      cod: { type: 'number', example: '88888888' },
      name: { type: 'string', example: 'escada' },
      description: { type: 'string', example: 'some description' },
      price: { type: 'number', example: '19.90' },
      unit: {
        type: 'string',
        example: Unit.KG.toString(),
        enum: [
          Unit.KG.toString(),
          Unit.M.toString(),
          Unit.L.toString(),
          Unit.M.toString(),
          Unit.UN.toString(),
        ],
      },
    },
  },
};

export function ListProduct() {
  return applyDecorators(
    ApiResponse(baseProductResponse as ApiResponseOptions),
    ApiResponse({
      status: 404,
    } as ApiResponseOptions),
  );
}

export function CreateProduct() {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody(baseProductBody as ApiBodyOptions),
    ApiResponse({ ...baseProductResponse, status: 201 } as ApiResponseOptions),
  );
}

export function UpdateProduct() {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiParam(idParam),
    ApiBody(baseProductBody as ApiBodyOptions),
    ApiResponse({
      status: 404,
    } as ApiResponseOptions),
    ApiResponse(baseProductResponse as ApiResponseOptions),
  );
}

export function FindProduct() {
  return applyDecorators(
    ApiParam(idParam),
    ApiResponse(baseProductResponse as ApiResponseOptions),
    ApiResponse({
      status: 404,
    } as ApiResponseOptions),
  );
}

export function DeleteProduct() {
  return applyDecorators(
    ApiParam(idParam),
    ApiResponse({
      status: 204,
    } as ApiResponseOptions),
    ApiResponse({
      status: 404,
    } as ApiResponseOptions),
  );
}
