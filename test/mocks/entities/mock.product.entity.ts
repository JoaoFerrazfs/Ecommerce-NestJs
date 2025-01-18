import { Product } from '../../../src/product/entities/product.entity';
import { Image } from '../../../src/product/entities/image-product.entity';
import { Unit } from '../../../src/product/enums/unit-enum';

export const mockedProduct = new Product();
mockedProduct.name = 'escada';
mockedProduct.images = [new Image('escada', 'https://image.jpg')];
mockedProduct.price = 19.99;
mockedProduct.unit = Unit.KG;
