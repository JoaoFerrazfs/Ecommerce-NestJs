import { ProductService } from '../../../src/product/services/product.service';
import { mockedProduct } from '../entities/mock.product.entity';

export const PRODUCT_SERVICE = {
  provide: ProductService,
  useValue: {
    create: jest.fn().mockResolvedValue(mockedProduct),
    findOne: jest.fn().mockResolvedValue(mockedProduct),
    update: jest.fn().mockResolvedValue(mockedProduct),
    list: jest.fn().mockResolvedValue([mockedProduct]),
    delete: jest.fn().mockResolvedValue(true),
  },
};
