import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ContentsService } from '../../services/contents.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from '../../entities/content.entity';
import { Repository } from 'typeorm';
import { CreateContentDto } from '../../dto/create-content.dto';
import { UpdateContentDto } from '../../dto/update-content.dto';
import {
  CreateContent,
  DeleteContent,
  FindContent,
  ListContents,
  UpdateContent,
} from '../../oas/content.oas';

@Controller('api/contents')
export class ContentsController {
  public constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    private readonly contentsService: ContentsService,
  ) {}

  @CreateContent()
  @Post('/create')
  public async createContent(
    @Body() data: CreateContentDto,
  ): Promise<{ data: Content }> {
    return { data: await this.contentsService.createContent(data) };
  }

  @ListContents()
  @Get('/list')
  public async list(): Promise<{ data: Content[] }> {
    return { data: await this.contentsService.list() };
  }

  @FindContent()
  @Get('/:id')
  public async find(
    @Param('id') id: string,
  ): Promise<{ data: Content } | null> {
    return { data: await this.contentsService.findById(id) };
  }

  @UpdateContent()
  @Patch('/:id')
  public async update(
    @Body() data: UpdateContentDto,
    @Param('id') id: string,
  ): Promise<{ data: Content }> {
    return { data: await this.contentsService.update(data, id) };
  }

  @DeleteContent()
  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: string): Promise<{ data: Boolean }> {
    return { data: await this.contentsService.delete(id) };
  }
}
