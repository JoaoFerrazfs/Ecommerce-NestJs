import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './products.controller';
import { productService } from '../../../test/mocks/services/mock.product-service';
import { expressResponse } from '../../../test/mocks/mock.responses';

describe('ProductController', () => {
  let controller: ProductController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [productService],
    }).compile();

    controller = await module.resolve(ProductController);
  });

  it('should create a products', async () => {
    // Expectations
    productService.useValue.getVewPath.mockReturnValue(
      '/products/views/product',
    );

    // Actions
    controller.product(expressResponse);

    // Assertions
    expect(expressResponse.render).toBeCalledWith('/products/views/product');
  });
});
