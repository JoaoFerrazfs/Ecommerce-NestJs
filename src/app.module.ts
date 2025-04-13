import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { Content } from './contents/entities/content.entity';
import { Banner } from './contents/entities/banner.entity';
import { ContentsModule } from './contents/contents.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './products/product.module';
import { Product } from './products/entities/product.entity';
import { HelpersModule } from './helpers/helpers.module';
import { OffersModule } from './offers/offers.module';
import { Offer } from './offers/entities/offer.entity';
import { ModulesModule } from './modules/modules.module';
import { ModuleEntity } from './modules/entities/module.entity';
import { KafkaModule } from './kafka/kafka.module';
import { ConsumerService } from './kafka/consumer/consumer.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      useNewUrlParser: true,
      port: 27017,
      host: 'localhost',
      database: 'ecommerce-nest-js',
      synchronize: true,
      entities: [Content, Banner, Product, Offer, ModuleEntity],
      useUnifiedTopology: false,
      logger: 'debug',
      logging: true,
    }),
    ContentsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AdminModule,
    ProductModule,
    HelpersModule,
    OffersModule,
    ModulesModule,
    KafkaModule
  ],
  // providers: [ConsumerService],
  controllers: [],
})
export class AppModule {}
