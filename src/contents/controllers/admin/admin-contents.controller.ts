import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContentsService } from '../../services/contents.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from '../../entities/content.entity';
import { Repository } from 'typeorm';
import { CreateContentDto } from '../../dto/create-content.dto';

@Controller('admin')
export class AdminContentsController {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    private readonly contentsService: ContentsService,
  ) {
  }

  @Get(['', 'contents'])
  index(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('listContents'), {
      layout: 'admin',
    });
  }

  @Get(['', 'contents'])
  create(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('adminContentsCreate'), {
      layout: 'admin',
    });
  }

  @Get('contents/create')
  content(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('adminContentsCreate'), {
      layout: 'admin',
      isEdit: false,
    });
  }

  @Post('contents/create') async createContent(@Body() data: CreateContentDto) {
    return { data: await this.contentsService.createContent(data) };
  }

  @Get('contents/list') async list() {
    return { data: await this.contentsService.list() };
  }
}
