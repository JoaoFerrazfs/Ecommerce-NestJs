import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ContentsService } from '../../services/contents.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from '../../entities/content.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateContentDto } from '../../dto/create-content.dto';
import { UpdateContentDto } from '../../dto/update-content.dto';
import {
  CreateContent,
  DeleteContent,
  FindContent,
  ListContents,
  UpdateContent,
} from '../../oas/content.oas';
import { FindByDto } from '../../dto/find-by.dto';
import { ObjectId } from 'mongodb';

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
  @Get('/:identifier')
  public async find(
    @Param('identifier') identifier: string,
  ): Promise<{ data: Content } | null> {
    try {
      const objectId = new ObjectId(identifier);
      if (objectId) {
        return { data: await this.contentsService.findById(objectId) };
      }
    } catch (error) {
      return { data: await this.contentsService.findOne({ name: identifier }) };
    }
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
