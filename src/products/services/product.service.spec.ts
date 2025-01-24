import { Test, TestingModule } from '@nestjs/testing';
import { productsRepository } from '../../../test/mocks/repositores/mock.ProductsRepository';
import { ProductService } from './product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { mockedProduct } from '../../../test/mocks/entities/mock.product.entity';
import { HelpersModule } from '../../helpers/helpers.module';
import { configService } from '../../../test/mocks/services/mock.config-service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { DeleteResult, ObjectId } from 'mongodb';

describe('ProductController', () => {
  let service: ProductService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, productsRepository, configService],

      imports: [HelpersModule],
    }).compile();

    service = await module.resolve(ProductService);
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
    productsRepository.useValue.create.mockResolvedValue(mockedProduct);
    productsRepository.useValue.save.mockResolvedValue(mockedProduct);

    // Actions
    const actual = await service.create(createProductDto);

    // Assertions
    expect(actual).toEqual({
      images: [
        {
          alt: 'escada',
          name: 'image',
          path: 'https://image.jpg',
        },
      ],
      name: 'escada',
      price: 19.99,
      unit: 'kg',
    });
  });

  it('should find a product', async () => {
    // Set
    const query = { _id: new ObjectId('67900cc2a315b7d062e2fccf') };

    // Expectations
    productsRepository.useValue.findOne.mockResolvedValue(mockedProduct);

    // Actions
    const actual = await service.findOne(query);

    // Assertions
    expect(actual).toEqual(mockedProduct);
    expect(productsRepository.useValue.findOne).toBeCalledWith({
      where: query,
    });
  });

  it('should delete a product', async () => {
    // Set
    const id = '67900cc2a315b7d062e2fccf';
    const query = { _id: new ObjectId(id) };

    // Expectations
    productsRepository.useValue.delete.mockResolvedValue({ affected: 1 });

    // Actions
    const actual = await service.delete(id);

    // Assertions
    expect(actual).toBeTruthy();
    expect(productsRepository.useValue.delete).toBeCalledWith(query);
  });

  it('should list all products', async () => {
    // Expectations
    productsRepository.useValue.find.mockResolvedValue([mockedProduct]);

    // Actions
    const actual = await service.list();

    // Assertions
    expect(actual).toEqual([mockedProduct]);
    expect(productsRepository.useValue.find).toBeCalledWith();
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
    productsRepository.useValue.update.mockResolvedValue({ affected: 1 });
    productsRepository.useValue.findOneBy.mockResolvedValue(mockedProduct);

    // Actions
    const actual = await service.update(
      updateProductDto,
      '6793c558ee32f0ee4b17e1a5',
    );

    // Assertions
    expect(actual).toEqual({
      images: [
        {
          alt: 'escada',
          name: 'image',
          path: 'https://image.jpg',
        },
      ],
      name: 'escada',
      price: 19.99,
      unit: 'kg',
    });
  });

  it('should not update a product', async () => {
    // Set
    const updateProductDto = {
      cod: 88888888,
      name: 'Escada 12 degraus',
      price: 99.99,
      unit: 'kg',
    } as UpdateProductDto;

    // Expectations
    productsRepository.useValue.update.mockResolvedValue({ affected: 0 });

    // Actions
    const actual = await service.update(
      updateProductDto,
      '6793c558ee32f0ee4b17e1a5',
    );

    // Assertions
    expect(actual).toBeNull();
  });

  it('should add images a product', async () => {
    // Set
    const files: Express.Multer.File[] = [
      { filename: 'test' },
    ] as Express.Multer.File[];
    const expectedProduct = {
      name: 'escada',
      price: 19.99,
      unit: 'kg',
      images: [
        {
          alt: 'escada',
          name: 'image',
          path: 'https://image.jpg',
        },
        {
          alt: 'escada',
          name: 'test',
          path: 'http://localhost:3000/public/uploads/files/test',
        },
      ],
    };

    // Expectations
    productsRepository.useValue.save.mockResolvedValue(mockedProduct);

    // Actions
    await service.addImage(mockedProduct, files);

    // Assertions
    expect(productsRepository.useValue.save).toBeCalledWith(expectedProduct);
  });

  it('should remove image a product', async () => {
    // Set
    const expectedProduct = {
      name: 'escada',
      price: 19.99,
      unit: 'kg',
      images: [
        {
          alt: 'escada',
          name: 'image',
          path: 'https://image.jpg',
        },
        {
          alt: 'escada',
          name: 'test',
          path: 'http://localhost:3000/public/uploads/files/test',
        },
      ],
    } as Product;

    // Expectations
    productsRepository.useValue.save.mockResolvedValue(mockedProduct);

    // Actions
    await service.removeImage(expectedProduct, 'test');

    // Assertions
    expect(productsRepository.useValue.save).toBeCalledWith({
      name: 'escada',
      price: 19.99,
      unit: 'kg',
      images: [{ alt: 'escada', name: 'image', path: 'https://image.jpg' }],
    });
  });
});
