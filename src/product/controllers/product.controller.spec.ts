import { ProductController } from './product.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from '../dto/create-product.dto';
import { productService } from '../../../test/mocks/services/mock.productService';
import { mockedProduct } from '../../../test/mocks/entities/mock.product.entity';
import { UpdateProductDto } from '../dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';
import { RemoveImageError } from '../dto/remove-product-image.dto';
import { ObjectId } from 'mongodb';
import { Product } from '../entities/product.entity';

describe('ProductController', () => {
  let controller: ProductController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [productService],
    }).compile();
    controller = await module.resolve(ProductController);
  });

  it('should create a product', async () => {
    // Set
    const createProductDto = {
      cod: 88888888,
      name: 'Escada 12 degraus',
      price: 99.99,
      unit: 'kg',
    } as CreateProductDto;

    // Expectations
    productService.useValue.create.mockResolvedValue(mockedProduct);

    // Actions
    const actual = await controller.create(createProductDto);

    // Assertions
    expect(actual).toEqual({ data: mockedProduct });
    expect(productService.useValue.create).toHaveBeenCalledWith(
      createProductDto,
    );
  });

  it('should update a product', async () => {
    // Set
    const updateProductDto = {
      cod: 88888888,
      name: 'Escada 12 degraus',
      price: 99.99,
      unit: 'kg',
    } as UpdateProductDto;

    // Expectations
    productService.useValue.update.mockResolvedValue(mockedProduct);

    // Actions
    const actual = await controller.update(
      updateProductDto,
      '678bddb1a28220251bc2fb84',
    );

    // Assertions
    expect(actual).toEqual({ data: mockedProduct });
    expect(productService.useValue.update).toHaveBeenCalledWith(
      updateProductDto,
      '678bddb1a28220251bc2fb84',
    );
  });

  it('should not update a product', async () => {
    // Set
    const createProductDto = {
      cod: 88888888,
      name: 'Escada 12 degraus',
      price: 99.99,
      unit: 'kg',
    } as UpdateProductDto;

    // Expectations
    productService.useValue.update.mockResolvedValue(null);

    // Actions
    const actual = controller.update(
      createProductDto,
      '678bddb1a28220251bc2fb84',
    );

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
    expect(productService.useValue.update).toBeCalledWith(
      createProductDto,
      '678bddb1a28220251bc2fb84',
    );
  });

  it('should find a product', async () => {
    // Expectations
    productService.useValue.findOne.mockResolvedValue(mockedProduct);

    // Actions
    const actual = await controller.findOne('678bddb1a28220251bc2fb84');

    // Assertions
    expect(actual).toEqual({ data: mockedProduct });
    expect(productService.useValue.findOne).toBeCalledWith({
      _id: new ObjectId('678bddb1a28220251bc2fb84'),
    });
  });

  it('should not find a product', async () => {
    // Expectations
    productService.useValue.findOne.mockResolvedValue(null);

    // Actions
    const actual = controller.findOne('678bddb1a28220251bc2fb84');

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
    expect(productService.useValue.findOne).toBeCalledWith({
      _id: new ObjectId('678bddb1a28220251bc2fb84'),
    });
  });

  it('should list all products', async () => {
    // Expectations
    productService.useValue.list.mockResolvedValue([mockedProduct]);

    // Actions
    const actual = await controller.list();

    // Assertions
    expect(actual).toEqual({ data: [mockedProduct] });
    expect(productService.useValue.list).toHaveBeenCalled();
  });

  it('should not find products', async () => {
    // Expectations
    productService.useValue.list.mockResolvedValue(null);

    // Actions
    const actual = controller.list();

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
    expect(productService.useValue.list).toHaveBeenCalled();
  });

  it('should delete a product', async () => {
    // Expectations
    productService.useValue.delete.mockResolvedValue(true);

    // Actions
    const actual = await controller.delete('678bddb1a28220251bc2fb84');

    // Assertions
    await expect(actual).toBeUndefined();
    expect(productService.useValue.delete).toHaveBeenCalledWith(
      '678bddb1a28220251bc2fb84',
    );
  });

  it('should not delete a product', async () => {
    // Expectations
    productService.useValue.delete.mockResolvedValue(false);

    // Actions
    const actual = controller.delete('678bddb1a28220251bc2fb84');

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
    expect(productService.useValue.delete).toHaveBeenCalledWith(
      '678bddb1a28220251bc2fb84',
    );
  });

  it('should add add images in a product', async () => {
    // Set
    const files = [
      { filename: 'fileName', path: 'https://image.jpg' },
    ] as Express.Multer.File[];

    // Expectations
    productService.useValue.findOne.mockResolvedValue(mockedProduct);
    productService.useValue.addImage.mockResolvedValue(mockedProduct);

    // Actions
    const actual = await controller.addImage(files, '678bddb1a28220251bc2fb84');

    // Assertions
    expect(actual).toEqual({ data: mockedProduct });
    expect(productService.useValue.findOne).toHaveBeenCalledWith({
      _id: new ObjectId('678bddb1a28220251bc2fb84'),
    });
    expect(productService.useValue.addImage).toHaveBeenCalledWith(
      mockedProduct,
      files,
    );
  });

  it('should not add images in a non-existent product', async () => {
    // Expectations
    productService.useValue.findOne.mockResolvedValue(null);

    const files = [
      { filename: 'fileName', path: 'https://image.jpg' },
    ] as Express.Multer.File[];

    // Actions
    const actual = controller.addImage(files, '678bddb1a28220251bc2fb84');

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
    expect(productService.useValue.findOne).toHaveBeenCalledWith({
      _id: new ObjectId('678bddb1a28220251bc2fb84'),
    });
  });

  it('should return images found in a product', async () => {
    // Expectations
    productService.useValue.findOne.mockResolvedValue(mockedProduct);

    // Actions
    const actual = await controller.getImages('678bddb1a28220251bc2fb84');

    // Assertions
    expect(actual).toEqual({ data: mockedProduct.images });
    expect(productService.useValue.findOne).toHaveBeenCalledWith({
      _id: new ObjectId('678bddb1a28220251bc2fb84'),
    });
  });

  it('should not return images if the product was not found', async () => {
    // Expectations
    productService.useValue.findOne.mockResolvedValue(null);

    // Actions
    const actual = controller.getImages('678bddb1a28220251bc2fb84');

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
    expect(productService.useValue.findOne).toHaveBeenCalledWith({
      _id: new ObjectId('678bddb1a28220251bc2fb84'),
    });
  });

  it('should remove a image from a product', async () => {
    // Set
    const removeImageError = { name: 'image' } as RemoveImageError;
    const expectedImage = { ...mockedProduct } as Product;
    delete expectedImage.images;

    // Expectations
    productService.useValue.findOne.mockResolvedValue(mockedProduct);
    productService.useValue.removeImage.mockResolvedValue(expectedImage);

    // Actions
    const actual = await controller.deleteImage(
      '678bddb1a28220251bc2fb84',
      removeImageError,
    );

    // Assertions
    expect(productService.useValue.findOne).toHaveBeenCalledWith({
      _id: new ObjectId('678bddb1a28220251bc2fb84'),
    });

    expect(actual).toEqual({
      data: {
        name: 'escada',
        price: 19.99,
        unit: 'kg',
      },
    });
  });

  it('should not remove a non-existent image from a product', async () => {
    // Set
    const removeImageError = { name: 'wrong-image' } as RemoveImageError;
    const expectedImage = { ...mockedProduct } as Product;
    delete expectedImage.images;

    // Expectations
    productService.useValue.findOne.mockResolvedValue(mockedProduct);

    // Actions
    const actual = controller.deleteImage(
      '678bddb1a28220251bc2fb84',
      removeImageError,
    );

    // Assertions
    expect(productService.useValue.findOne).toHaveBeenCalledWith({
      _id: new ObjectId('678bddb1a28220251bc2fb84'),
    });
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should not remove a image from a not found product', async () => {
    // Set
    const removeImageError = { name: 'image' } as RemoveImageError;

    // Expectations
    productService.useValue.findOne.mockResolvedValue(null);

    // Actions
    const actual = controller.deleteImage(
      '678bddb1a28220251bc2fb84',
      removeImageError,
    );

    // Assertions
    expect(productService.useValue.findOne).toHaveBeenCalledWith({
      _id: new ObjectId('678bddb1a28220251bc2fb84'),
    });
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
  });
});
