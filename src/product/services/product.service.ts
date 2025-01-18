import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Image } from '../entities/image-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageHelper } from '../../helpers/image.helper';
import { ObjectId, UpdateResult } from 'mongodb';

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

  async update(
    updateProductDto: Partial<UpdateProductDto> & { images: string[] },
    id: string,
  ): Promise<Product | null> {
    const imagesEntity: Image[] = updateProductDto.images.map((path) => {
      return new Image(
        updateProductDto.name,
        this.imageHelper.buildImageURL(path),
      );
    });

    const updateResult = await this.productRepository.update(
      { _id: new ObjectId(id) },
      {
        ...updateProductDto,
        images: imagesEntity,
      } as Product,
    );

    if (!updateResult.affected) return null;

    return await this.productRepository.findOneBy({ _id: new ObjectId(id) });
  }

  public async findOne(
    query: FindOptionsWhere<Product> | FindOptionsWhere<Product>[],
  ): Promise<Product> {
    return await this.productRepository.findOne({ where: query });
  }

  public async list(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.productRepository.delete({
      _id: new ObjectId(id),
    });

    return !!result.affected;
  }
}
