import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ContentsService } from '../../services/contents.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from '../../entities/content.entity';
import { Repository } from 'typeorm';
import { CreateContentDto } from '../../dto/create-content.dto';
import { UpdateContentDto } from '../../dto/update-content.dto';

@Controller('api/contents')
export class ContentsController {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    private readonly contentsService: ContentsService,
  ) {
  }

  @Post('/create') async createContent(@Body() data: CreateContentDto) {
    return { data: await this.contentsService.createContent(data) };
  }

  @Get('/list') async list() {
    return { data: await this.contentsService.list() };
  }

  @Get('/:id') async find(@Param('id') id: string) {
    return { data: await this.contentsService.find(id) };
  }

  @Patch('/:id') async update(@Body() data: UpdateContentDto, @Param('id') id: string) {
    return { data: await this.contentsService.update(data, id) };
  }

  @Delete('/:id') async delete(@Param('id') id: string) {
    return { data: await this.contentsService.delete(id) };
  }
}
