import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Image } from '../entities/image-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageHelper } from '../../helpers/image.helper';
import { ObjectId } from 'mongodb';
import { RenderContract } from '../../contracts/services/render-contract';

@Injectable()
export class ProductService implements RenderContract {
  PATH_VIEWS = 'products/views/';

  public constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly imageHelper: ImageHelper,
  ) {}

  create(createProductDto: Partial<CreateProductDto>): Promise<Product> {
    const product: Product = this.productRepository.create(createProductDto);

    return this.productRepository.save(product);
  }

  async update(
    updateProductDto: Partial<UpdateProductDto>,
    id: string,
  ): Promise<Product | null> {
    const updateResult = await this.productRepository.update(
      { _id: new ObjectId(id) },
      updateProductDto,
    );

    if (!updateResult.affected) return null;

    return await this.productRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async addImage(
    product: Product,
    files: Array<Express.Multer.File>,
  ): Promise<Product | null> {
    const newImages = this.buildImages(files, product.name);
    product.images = [...(product.images || []), ...newImages];

    return await this.productRepository.save(product);
  }

  async removeImage(product: Product, imageName: string): Promise<Product> {
    product.images = product.images.filter(
      (image: Image) => image.name !== imageName,
    );

    return await this.productRepository.save(product);
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

  private buildImages(
    images: Array<Express.Multer.File>,
    alt: string,
  ): Image[] {
    return images.map((image) => {
      return new Image(
        alt,
        this.imageHelper.buildImageURL(image.filename),
        image.filename,
      );
    });
  }

  getVewPath(fileName: string): string {
    return this.PATH_VIEWS + fileName;
  }
}
