import { Test, TestingModule } from '@nestjs/testing';
import { IndexProductsCommand } from '../../commands/openSearch/index-products.command';
import { productService } from '../../../test/mocks/services/products/mock.product-service';
import { MockedOpenSearchService } from '../../../test/mocks/services/openSearch/mock.openSearch-service';
import { mockedProduct } from '../../../test/mocks/entities/mock.product.entity';

describe('IndexProductsCommand', () => {
  let command: IndexProductsCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndexProductsCommand,
        productService,
        MockedOpenSearchService,
      ],
    }).compile();

    command = module.get(IndexProductsCommand);
  });

  it('should index all of the products in database', async () => {
    // Expectations
    productService.useValue.list.mockResolvedValue([mockedProduct]);

    // Actions
    await command.run([], {});

    // Expectations
    expect(productService.useValue.list).toHaveBeenCalled();
    expect(MockedOpenSearchService.useValue.bulkIndex).toHaveBeenCalledWith(
      'products',
      [mockedProduct],
    );
  });
});
