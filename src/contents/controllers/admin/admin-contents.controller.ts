import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContentsService } from '../../services/contents.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from '../../entities/content.entity';
import { Repository } from 'typeorm';
import { CreateContentDto } from '../../dto/create-content.dto';
import { UpdateContentDto } from '../../dto/update-content.dto';

@Controller()
export class AdminContentsController {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    private readonly contentsService: ContentsService,
  ) {
  }

  @Get(['admin', 'admin/contents'])
  index(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('listContents'), {
      layout: 'admin',
    });
  }

  @Get(['admin', 'admin/contents'])
  create(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('adminContentsCreate'), {
      layout: 'admin',
    });
  }

  @Get('admin/contents/create')
  content(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('adminContentsCreate'), {
      layout: 'admin',
      isEdit: false,
    });
  }

  @Post('admin/contents/create') async createContent(@Body() data: CreateContentDto) {
    return { data: await this.contentsService.createContent(data) };
  }

  @Get('admin/contents/list') async list() {
    return { data: await this.contentsService.list() };
  }

  @Get('contents/content/:id') async find(@Param('id') id: string) {
    return { data: await this.contentsService.find(id) };
  }

  @Patch('contents/content/:id') async update(@Body() data: UpdateContentDto, @Param('id') id: string) {
    return { data: await this.contentsService.update(data, id) };
  }

  @Get('admin/contents/edit/:id') async edit(@Res() res: Response, @Param('id') id: string) {
    return res.render(this.contentsService.getVewPath('adminContentsCreate'), {
      layout: 'admin',
      isEdit: true,
      id,
    });
  }

  @Delete('contents/content/:id') async delete(@Param('id') id: string) {
    return { data: await this.contentsService.delete(id) };
  }
}
