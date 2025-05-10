import { Product } from '../../../../products/entities/product.entity';
import { Unit } from '../../../../products/enums/unit-enum';
import { IndexMapInterface } from '../opensearch.mapper';
import { BaseEntity } from 'typeorm';

export class ProductMapper implements IndexMapInterface{
  map(data: any): BaseEntity{
    const products = new Product();

    products.name = data?.name ?? '';
    products.description = data?.description ?? '';
    products.price = data?.price ?? 0 ;
    products.unit = data?.unit ?? Unit.UN;
    products.stock = data?.stock ?? 0;
    products.images = data?.images ?? [];

    return products;
  }
}