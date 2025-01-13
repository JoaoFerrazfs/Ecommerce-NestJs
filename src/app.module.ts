import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { Content } from './contents/entities/content.entity';
import { Banner } from './contents/entities/banner.entity';
import { ContentsModule } from './contents/contents.module';
import { AdminModule } from './admin/admin.module';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    ConfigModule.forRoot({isGlobal: true}),
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
