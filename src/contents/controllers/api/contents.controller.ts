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
import { ProducerService } from '../../../kafka/producer/producer.service';

@Controller('api/contents')
export class ContentsController {

  readonly KAFKA_TOPIC: string = 'contents_creation';

  public constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    private readonly contentsService: ContentsService,
    private readonly kafkaProducerService: ProducerService,
  ) {}

  @CreateContent()
  @Post('/create')
  public async createContent(
    @Body() data: CreateContentDto,
  ): Promise<{ data: Content }> {
    const content = await this.contentsService.createContent(data);
    await this.kafkaProducerService.sendMessage(this.KAFKA_TOPIC, content);

    return { data: content};
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
