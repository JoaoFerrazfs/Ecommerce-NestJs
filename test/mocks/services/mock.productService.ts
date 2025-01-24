import { ProductService } from '../../../src/products/services/product.service';

export const productService = {
  provide: ProductService,
  useValue: {
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    addImage: jest.fn(),
    removeImage: jest.fn(),
  },
};
