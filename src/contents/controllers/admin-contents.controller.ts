import { Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContentsService } from '../services/contents.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from '../entities/content.entity';
import { Repository } from 'typeorm';
import { Banner } from '../entities/banner.entity';

@Controller('admin/contents')
export class AdminContentsController {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
    private readonly contentsService: ContentsService,
  ) {}

  @Get('/create')
  content(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('adminContents'), {
      layout: 'admin',
    });
  }

  @Post('/content') async createContent() {
    const banner = await this.bannerRepository.create({
      name: 'olaaa',
      image: 'https',
    });
    const savedBanner = await this.bannerRepository.save(banner);

    const content = await this.contentRepository.create({
      banners: [savedBanner],
      name: '',
    });

    return { data: await this.contentRepository.save(content) };
  }
}
