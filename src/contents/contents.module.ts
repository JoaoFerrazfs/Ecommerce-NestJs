import { Module } from '@nestjs/common';
import { ContentsController } from './controllers/contents.controller';
import { ContentsService } from './services/contents.service';
import { AdminContentsController } from './controllers/admin-contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Banner } from './entities/banner.entity';
import { AdminBannerController } from './controllers/admin-banners.controller';

@Module({
  controllers: [
    ContentsController,
    AdminContentsController,
    AdminBannerController,
  ],
  providers: [ContentsService],
  imports: [TypeOrmModule.forFeature([Content, Banner])],
})
export class ContentsModule {}
