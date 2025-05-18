import { Controller, Get, Res } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Response } from 'express';

@Controller('products')
export class ProductController {
  public constructor(private readonly productService: ProductService) {}

  @Get('/:id')
  public product(@Res() res: Response) {
    return res.render(this.productService.getVewPath('product'));
  }

  @Get('/search/result')
  public productSearch(@Res() res: Response) {
    return res.render(this.productService.getVewPath('product-search-result'));
  }
}
