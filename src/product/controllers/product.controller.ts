import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Param,
  NotFoundException,
  Get,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { HasFile } from '../../contents/pipes/has-file.pipe';
import { FileValidationPipe } from '../../contents/pipes/file-validation.pipe';
import { FilesInterceptor } from '@nestjs/platform-express';
import multerConfig from '../../files/multer-config';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ObjectId } from 'mongodb';
import { Product } from '../entities/product.entity';
import {
  CreateProduct,
  DeleteProduct,
  FindProduct,
  ListProduct,
  UpdateProduct,
} from '../oas/product.oas';
import { Image } from '../entities/image-product.entity';
import { RemoveImageError } from '../dto/remove-product-image.dto';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ListProduct()
  @Get()
  async list(): Promise<{ data: Product[] }> {
    const product = await this.productService.list();
    if (!product) throw new NotFoundException(`There are not products`);

    return { data: product };
  }

  @CreateProduct()
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<{ data: Product }> {
    return {
      data: await this.productService.create(createProductDto),
    };
  }

  @UpdateProduct()
  @Patch('/:id')
  async update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<{ data: Product }> {
    const product = await this.productService.update(updateProductDto, id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return { data: product };
  }

  @FindProduct()
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<{ data: Product }> {
    const product = await this.productService.findOne({
      _id: new ObjectId(id),
    });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return { data: product };
  }

  @DeleteProduct()
  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const product = await this.productService.delete(id);
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return;
  }

  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  @Patch('/:id/images')
  async addImage(
    @UploadedFiles(HasFile, FileValidationPipe)
    files: Array<Express.Multer.File>,
    @Param('id') id: string,
  ): Promise<{ data: Product }> {
    const product = await this.productService.findOne({
      _id: new ObjectId(id),
    });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return { data: await this.productService.addImage(product, files) };
  }

  @Get('/:id/images')
  async getImages(@Param('id') id: string): Promise<{ data: Image[] }> {
    const product = await this.productService.findOne({
      _id: new ObjectId(id),
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return { data: product.images };
  }

  @Patch('/:id/images/remove')
  async deleteImage(
    @Param('id') id: string,
    @Body() { name }: RemoveImageError,
  ): Promise<{ data: Product }> {
    const product = await this.productService.findOne({
      _id: new ObjectId(id),
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const isValidImage = product.images.find((image) => image.name === name);

    if (!isValidImage) {
      throw new NotFoundException(`Image not found: ${name}`);
    }

    return { data: await this.productService.removeImage(product, name) };
  }
}
