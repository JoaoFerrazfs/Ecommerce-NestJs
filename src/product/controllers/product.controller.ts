import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { HasFile } from '../../contents/pipes/has-file.pipe';
import { FileValidationPipe } from '../../contents/pipes/file-validation.pipe';
import { FilesInterceptor } from '@nestjs/platform-express';
import multerConfig from '../../files/multer-config';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  create(
    @UploadedFiles(HasFile, FileValidationPipe)
    files: Array<Express.Multer.File>,
    @Body() createProductDto: CreateProductDto,
  ) {
    const paths = files.map((file) => file.filename);
    return this.productService.create({ ...createProductDto, images: paths });
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
