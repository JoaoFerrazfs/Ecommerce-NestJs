import { Module } from '@nestjs/common';
import { ContentsModule } from './contents/contents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './contents/entities/content.entity';
import { Banner } from './contents/entities/banner.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      useNewUrlParser: true,
      port: 27017,
      host: 'localhost',
      database: 'ecommerce-nest-js',
      synchronize: true,
      entities: [Content, Banner],
      useUnifiedTopology: false,
      logger: 'debug',
      logging: true,
    }),
    ContentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
