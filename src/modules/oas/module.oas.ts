import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiParamOptions, ApiResponse,
} from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';

export function CreateModule() {
  return applyDecorators(
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          modules: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['Banner', 'Offer'],
                },
                _id: { type: 'string' },
              },
              required: ['type', '_id'],
            },
          },
        },
      },
    }),
  );
}

export function UpdateModule() {
  return applyDecorators(
    ApiParam(idParam),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          modules: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['Banner', 'Offer'],
                },
                _id: { type: 'string' },
              },
              required: ['type', '_id'],
            },
          },
        },
      },
    }),
    ApiNoContentResponse(),
    ApiNotFoundResponse({ example: 'O Modulo 12345678 não encontrado' }),
    ApiBadRequestResponse({ example: 'O Modulo 12345678 não pode ser atualizado' }),
  );
}

export function FindOneModule() {
  return applyDecorators(
    ApiParam(idParam),
    ApiResponse({
      status: HttpStatus.OK,
      example: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '12345678' },
              modulesGroup: {
                type: 'array', items: {
                  type: 'object', properties: {
                    type: {
                      type: 'string',
                      enum: ['Banner', 'Offer'],
                      example: 'Banner',
                    },
                    _id: { type: 'string', example: '12345678' },
                  },
                },
              },
            },
          },
        },
      },
    }),
    ApiNotFoundResponse({ example: 'O Modulo 12345678 não encontrado' }),
  );
}

export function DeleteModule() {
  return applyDecorators(
    ApiParam(idParam),
    ApiNoContentResponse(),
    ApiNotFoundResponse({ example: 'O Modulo 12345678 não pode ser apagado' }),
  );
}

export function FindAllModule() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      example: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string', example: '677ecdf5b0b5e2594e8e562d' },
                modulesGroup: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string',
                        enum: ['Banner', 'Offer'],
                        example: 'Banner',
                      },
                      _id: {
                        type: 'string',
                        example: '677ecdf5b0b5e2594e8e562d',
                      },

                    },
                  },
                },
              },
            },
          },
        },
      },
    }),
  );
}

/**
 * @todo Padronizar retorno da api com transformers
 * @todo Adicionar transformers para ajudar na validação dos retornos das apis
 * */
export function FindAllLoadedModules() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      example: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string', example: '677ecdf5b0b5e2594e8e562d' },
                modulesGroup: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string',
                        enum: ['Banner', 'Offer'],
                        example: 'Banner',
                      },
                      _id: {
                        type: 'string',
                        example: '677ecdf5b0b5e2594e8e562d',
                      },

                    },
                  },
                },
              },
            },
          },
        },
      },
    }),
  );
}

const idParam = {
  name: 'id',
  type: String,
  description: 'ID of the module',
  example: '677ecdf5b0b5e2594e8e562d',
} as ApiParamOptions;