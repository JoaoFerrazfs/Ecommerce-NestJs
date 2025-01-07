import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContentsService } from '../services/contents.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from '../entities/content.entity';
import { Repository } from 'typeorm';
import { Banner } from '../entities/banner.entity';

@Controller('admin/banners')
export class AdminBannerController {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
    private readonly contentsService: ContentsService,
  ) {}

  @Get('/create')
  banner(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('adminContentsBanner'), {
      layout: 'admin',
    });
  }
}
