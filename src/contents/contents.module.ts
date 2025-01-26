import { Module } from '@nestjs/common';
import { ContentsService } from './services/contents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Banner } from './entities/banner.entity';
import { BannersService } from './services/banners.service';
import { ConfigService } from '@nestjs/config';
import { ContentsController } from './controllers/contents.controller';
import { BannerController as ApiBannersController } from './controllers/api/banners.controller';
import { ContentsController as ApiContentsController } from './controllers/api/contents.controller';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  controllers: [
    ContentsController,
    ApiContentsController,
    ApiBannersController,
  ],
  providers: [ContentsService, BannersService, ConfigService],
  imports: [TypeOrmModule.forFeature([Content, Banner]), HelpersModule],
  exports: [BannersService],
})
export class ContentsModule {}
