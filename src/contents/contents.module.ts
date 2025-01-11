import { Module } from '@nestjs/common';
import { ContentsService } from './services/contents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Banner } from './entities/banner.entity';
import { BannersService } from './services/banners.service';
import { ConfigService } from '@nestjs/config';
import { ContentsController } from './controllers/ecommerce/contents.controller';
import { AdminContentsController } from './controllers/admin/admin-contents.controller';
import { AdminBannerController } from './controllers/admin/admin-banners.controller';

@Module({
  controllers: [
    ContentsController,
    AdminContentsController,
    AdminBannerController,
  ],
  providers: [ContentsService, BannersService, ConfigService],
  imports: [TypeOrmModule.forFeature([Content, Banner])],
})
export class ContentsModule {}
