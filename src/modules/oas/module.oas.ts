import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiParamOptions,
  ApiResponse,
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
                name: {
                  type: 'string',
                  example: 'test',
                },
                type: {
                  type: 'string',
                  enum: ['Banner', 'Offer'],
                },
                _id: { type: 'string', example: '677ecdf5b0b5e2594e8e562d' },
              },
              required: ['type', '_id'],
            },
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'test',
          },
          modulesGroup: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['Banner', 'Offer'],
                },
                _id: { type: 'string', example: '677ecdf5b0b5e2594e8e562d' },
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
    ApiBadRequestResponse({
      example: 'O Modulo 12345678 não pode ser atualizado',
    }),
  );
}

export function FindOneModule() {
  return applyDecorators(
    ApiParam(idParam),
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '12345678' },
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
      schema: {
        type: 'object',
        required: ['data'],
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
      schema: {
        type: 'object',
        required: ['data'],
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              required: ['_id', 'modulesGroup'],
              properties: {
                _id: { type: 'string', example: '677ecdf5b0b5e2594e8e562d' },
                modulesGroup: {
                  type: 'array',
                  items: {
                    type: 'object',
                    oneOf: [
                      {
                        type: 'object',
                        properties: {
                          title: {
                            type: 'string',
                            example: 'ar condicionado',
                          },
                          _id: {
                            type: 'string',
                            example: '677ecdf5b0b5e2594e8e562d',
                          },
                          image: {
                            type: 'string',
                            example:
                              'http://localhost:3000/public/uploads/files/_5_home_tv___climatizacao_com_ate_20percentoff_15_01_a_20_01_a834_1180x320-7715ba54-c402-44b8-9123-8c7eb1a0dbc6.webp',
                          },
                        },
                      },
                      {
                        type: 'object',
                        properties: {
                          title: {
                            type: 'string',
                            example: 'ar condicionado',
                          },
                          _id: {
                            type: 'string',
                            example: '677ecdf5b0b5e2594e8e562d',
                          },
                          products: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                _id: {
                                  type: 'string',
                                  example: '677ecdf5b0b5e2594e8e562d',
                                },
                                cod: {
                                  type: 'number',
                                  example: 88888888,
                                },
                                name: {
                                  type: 'string',
                                  example: 'Escada',
                                },
                                description: {
                                  type: 'string',
                                  example:
                                    'Uma escada de 12 degraus é uma estrutura vertical',
                                },
                                price: {
                                  type: 'number',
                                  format: 'float',
                                  example: 19.99,
                                },
                                unit: {
                                  type: 'string',
                                },
                                stock: {
                                  type: 'number',
                                  example: 1,
                                },
                                images: {
                                  type: 'array',
                                  items: {
                                    type: 'object',
                                    properties: {
                                      alt: {
                                        type: 'string',
                                        example: 'A',
                                      },
                                      path: {
                                        type: 'string',
                                        example: '/uploads/files/_5_home_tv',
                                      },
                                      name: {
                                        type: 'string',
                                        example: 'Boia',
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    ],
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
