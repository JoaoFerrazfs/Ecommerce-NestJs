import { Product } from '../../../src/products/entities/product.entity';
import { Image } from '../../../src/products/entities/image-product.entity';
import { Unit } from '../../../src/products/enums/unit-enum';

export const mockedProduct = new Product();
mockedProduct.name = 'escada';
mockedProduct.images = [new Image('escada', 'https://image.jpg', 'image')];
mockedProduct.price = 19.99;
mockedProduct.unit = Unit.KG;
