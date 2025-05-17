import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './contents/entities/content.entity';
import { Banner } from './contents/entities/banner.entity';
import { Product } from './products/entities/product.entity';
import { Offer } from './offers/entities/offer.entity';
import { ModuleEntity } from './modules/entities/module.entity';
import { ContentsModule } from './contents/contents.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './products/product.module';
import { HelpersModule } from './helpers/helpers.module';
import { OffersModule } from './offers/offers.module';
import { ModulesModule } from './modules/modules.module';
import { OpenSearchModule } from './openSearch/opensearch.module';

export const MODULE_APP_CONFIG = {
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      port: 27017,
      host: 'localhost',
      database: 'ecommerce-nest-js',
      synchronize: true,
      entities: [Content, Banner, Product, Offer, ModuleEntity],
      logger: 'debug',
      logging: true,
    }),
    ContentsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      serveRoot: '/public',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AdminModule,
    ProductModule,
    HelpersModule,
    OffersModule,
    ModulesModule,
    OpenSearchModule,
  ],
  controllers: [],
};
