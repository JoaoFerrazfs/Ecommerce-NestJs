import { CreateProductsSeed } from './CreateProductsSeed';
import { Test, TestingModule } from '@nestjs/testing';
import { productService } from '../../../test/mocks/services/products/mock.product-service';
import { mockedProduct } from '../../../test/mocks/entities/mock.product.entity';

describe('IndexProductsCommand', () => {
  let command: CreateProductsSeed;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateProductsSeed, productService],
    }).compile();

    command = module.get(CreateProductsSeed);
  });

  it('should create two products', async () => {
    // Expectations
    productService.useValue.create.mockResolvedValue(mockedProduct);

    // Actions
    await command.run([], { quantity: 2 });

    // Expectations
    expect(productService.useValue.create).toHaveBeenCalledTimes(2);
  });
});
