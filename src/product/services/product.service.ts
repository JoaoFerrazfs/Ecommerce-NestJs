import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Image } from '../entities/image-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageHelper } from '../../helpers/image.helper';

@Injectable()
export class ProductService {
  public constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly imageHelper: ImageHelper,
  ) {}

  create(
    createProductDto: Partial<CreateProductDto> & { images: string[] },
  ): Promise<Product> {
    const imagesEntity: Image[] = createProductDto.images.map((path) => {
      return new Image(
        createProductDto.name,
        this.imageHelper.buildImageURL(path),
      );
    });

    const product: Product = this.productRepository.create({
      ...createProductDto,
      images: imagesEntity,
    });

    return this.productRepository.save(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
