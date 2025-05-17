import { Product } from '../../../../products/entities/product.entity';
import {
  parseStringToUnitEnum,
  Unit,
} from '../../../../products/enums/unit-enum';
import { IndexMapInterface } from '../contracts/opensearch-map.intereface';
import { Image } from '../../../../products/entities/image-product.entity';

export class ProductEntityMapper implements IndexMapInterface {
  map(data: any): Product {
    const products = new Product();

    products.name = data?.name ?? '';
    products.description = data?.description ?? '';
    products.price = data?.price ?? 0;
    products.unit = parseStringToUnitEnum(data?.unit ?? '') ?? Unit.UN;
    products.stock = data?.stock ?? 0;
    products.images = data?.images ? this.parseImages(data.images) : [];
    products.cod = data?.cod ?? 0;

    return products;
  }

  private parseImages(
    images: { alt: string; path: string; name: string }[],
  ): Image[] {
    return images.map((image) => {
      return new Image(image.alt, image.path, image.name);
    });
  }
}
