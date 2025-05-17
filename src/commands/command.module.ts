import { Module } from '@nestjs/common';
import { IndexProductsCommand } from './openSearch/index-products.command';
import { MODULE_APP_CONFIG } from '../common-configs';
import { CreateProductsSeed } from './seeds/CreateProductsSeed';

@Module({
  providers: [IndexProductsCommand, CreateProductsSeed],
  ...MODULE_APP_CONFIG,
})
export class CommandModule {}
