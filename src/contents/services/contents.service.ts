import { Injectable } from '@nestjs/common';
import { RenderContract } from '../../contracts/services/render-contract';
import { Content } from '../entities/content.entity';
import { CreateContentDto } from '../dto/create-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Banner } from '../entities/banner.entity';
import { ObjectId } from 'mongodb';
import { UpdateContentDto } from '../dto/update-content.dto';

@Injectable()
export class ContentsService implements RenderContract {
  PATH_VIEWS = 'contents/views/';

  public constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
  ) {}

  public getVewPath(fileName: string): string {
    return this.PATH_VIEWS + fileName;
  }

  public async list(): Promise<Content[]> {
    return await this.contentRepository.find();
  }

  public async delete(id: string): Promise<Boolean> {
    const result = await this.contentRepository.delete(new ObjectId(id));

    return Boolean(result.affected);
  }

  public async findById(id: ObjectId): Promise<Content | null> {
    return this.contentRepository.findOneBy({ _id: id });
  }

  public async where(
    query: FindOptionsWhere<Content>[] | FindOptionsWhere<Content>,
  ): Promise<Content[]> {
    return this.contentRepository.find({ where: query });
  }

  public async findOne(
    query: FindOptionsWhere<Content>[] | FindOptionsWhere<Content>,
  ): Promise<Content | null> {
    return this.contentRepository.findOne({ where: query });
  }

  public async createContent(data: CreateContentDto): Promise<Content> {
    const banners = await Promise.all(
      data.banners.map(async (bannerId) => {
        return await this.bannerRepository.findOneBy({
          _id: new ObjectId(bannerId),
        });
      }),
    );

    const content = new Content();
    content.banners = banners;
    content.name = data.name;
    content.modules = data.modules;

    return await this.contentRepository.save(content);
  }

  public async update(data: UpdateContentDto, id: string): Promise<Content> {
    const banners = await Promise.all(
      data.banners.map(async (bannerId) => {
        return await this.bannerRepository.findOneBy({
          _id: new ObjectId(bannerId),
        });
      }),
    );

    const content = await this.contentRepository.findOneBy({
      _id: new ObjectId(id),
    });

    content.name = data.name;
    content.banners = banners;
    content.modules = data.modules;
    return await this.contentRepository.save(content);
  }
}
