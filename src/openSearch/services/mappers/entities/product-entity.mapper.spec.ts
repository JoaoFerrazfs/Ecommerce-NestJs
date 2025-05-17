import { Test, TestingModule } from '@nestjs/testing';
import { ProductEntityMapper } from './product-entity-mapper';
import { Product } from '../../../../products/entities/product.entity';
import {
  parseStringToUnitEnum,
  Unit,
} from '../../../../products/enums/unit-enum';
import { Image } from '../../../../products/entities/image-product.entity';

describe('Product Entity Mapper', () => {
  let productEntityMapper: ProductEntityMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductEntityMapper],
    }).compile();

    productEntityMapper = module.get(ProductEntityMapper);
  });

  it('should map a product', () => {
    const data = {
      name: 'Furadeira Turbo X',
      description: 'Uma furadeira potente e versátil.',
      price: 249.9,
      unit: 'kg',
      stock: 30,
      images: [
        {
          alt: 'Escada',
          path: 'http://localhost:3000/public/uploads/files/escada-58998644-acfc-4111-9f24-5a2b0294abcf.webp',
          name: 'escada-58998644-acfc-4111-9f24-5a2b0294abcf.webp',
        },
      ],
      cod: 12345678,
    };

    const expected = new Product();
    expected.name = data.name;
    expected.description = data.description;
    expected.price = data.price;
    expected.unit = parseStringToUnitEnum(data.unit);
    expected.stock = data.stock;
    expected.images = data.images;
    expected.cod = data.cod;

    // Actions
    const actual = productEntityMapper.map(data);

    // Expectations
    expect(actual).toEqual(expected);
    expect(actual.images[0]).toBeInstanceOf(Image);
    expect(actual.unit).toEqual(Unit.KG);
  });
});
