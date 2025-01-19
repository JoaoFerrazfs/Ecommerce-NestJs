import { ProductController } from './product.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from '../dto/create-product.dto';
import { PRODUCT_SERVICE as productService } from '../../../test/mocks/services/mock.productService';
import { mockedProduct } from '../../../test/mocks/entities/mock.product.entity';
import { UpdateProductDto } from '../dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [productService],
    }).compile();

    controller = module.get(ProductController);
  });

  it('should create a product', async () => {
    // Set
    const createProductDto = {
      cod: 88888888,
      name: 'Escada 12 degraus',
      price: 99.99,
      unit: 'kg',
    } as CreateProductDto;

    // Actions
    const actual = await controller.create(createProductDto);

    // Assertions
    expect(actual).toEqual({ data: mockedProduct });
  });

  it('should update a product', async () => {
    // Set
    const createProductDto = {
      cod: 88888888,
      name: 'Escada 12 degraus',
      price: 99.99,
      unit: 'kg',
    } as UpdateProductDto;

    // Actions
    const actual = await controller.update(
      createProductDto,
      '678bddb1a28220251bc2fb84',
    );

    // Assertions
    expect(actual).toEqual({ data: mockedProduct });
  });

  it('should not update a product', async () => {
    // Set
    const createProductDto = {
      cod: 88888888,
      name: 'Escada 12 degraus',
      price: 99.99,
      unit: 'kg',
    } as UpdateProductDto;

    productService.useValue.update.mockResolvedValue(null);

    // Actions
    const actual = controller.update(
      createProductDto,
      '678bddb1a28220251bc2fb84',
    );

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should find a product', async () => {
    // Actions
    const actual = await controller.findOne('678bddb1a28220251bc2fb84');

    // Assertions
    expect(actual).toEqual({ data: mockedProduct });
  });

  it('should not find a product', async () => {
    // Set
    productService.useValue.findOne.mockResolvedValue(null);

    // Actions
    const actual = controller.findOne('678bddb1a28220251bc2fb84');

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should list all products', async () => {
    // Actions
    const actual = await controller.list();

    // Assertions
    expect(actual).toEqual({ data: [mockedProduct] });
  });

  it('should not find products', async () => {
    // Set
    productService.useValue.list.mockResolvedValue(null);

    // Actions
    const actual = controller.list();

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should delete a product', async () => {
    // Actions
    const actual = await controller.delete('678bddb1a28220251bc2fb84');

    // Assertions
    await expect(actual).toBeUndefined();
  });

  it('should not delete a product', async () => {
    // Set
    productService.useValue.delete.mockResolvedValue(false);

    // Actions
    const actual = controller.delete('678bddb1a28220251bc2fb84');

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
  });
});
