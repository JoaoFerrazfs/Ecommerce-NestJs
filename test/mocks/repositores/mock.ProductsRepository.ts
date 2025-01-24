import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../../src/products/entities/product.entity';

export const productsRepository = {
  provide: getRepositoryToken(Product),
  useValue: {
    update: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findOneBy: jest.fn(),
    findOne: jest.fn(),
  },
};
