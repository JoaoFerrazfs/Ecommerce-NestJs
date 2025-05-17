import { Module } from '@nestjs/common';
import { ProductController } from './controllers/api/product.controller';
import { ProductController as RenderProductController } from './controllers/products.controller';
import { ProductService } from './services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  controllers: [ProductController, RenderProductController],
  providers: [ProductService],
  imports: [TypeOrmModule.forFeature([Product]), HelpersModule],
  exports: [ProductService],
})
export class ProductModule {}
