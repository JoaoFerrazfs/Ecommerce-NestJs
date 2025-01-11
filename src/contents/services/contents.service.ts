import { Injectable, NotFoundException } from '@nestjs/common';
import { RenderContract } from '../../contracts/services/render-contract';
import { Content } from '../entities/content.entity';
import { CreateContentDto } from '../dto/create-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from '../entities/banner.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ContentsService implements RenderContract {
  PATH_VIEWS = 'contents/views/';

  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
  ) {
  }

  getVewPath(fileName: string) {
    return this.PATH_VIEWS + fileName;
  }

  async list() {
    return await this.contentRepository.find();
  }

  async createContent(data: CreateContentDto) {
    const banners = await Promise.all(
      data.banners.map(async (bannerId) => {
        const objectId = new ObjectId(bannerId);
        return await this.bannerRepository.findOneBy({ _id: objectId });
      }),
    );

    const validBanners = banners.filter((banner) => banner !== null);

    if (validBanners.length === 0) {
      throw new Error('Nenhum banner válido encontrado');
    }

    const content = new Content();
    content.banners = validBanners;
    content.name = data.title;

    return await this.contentRepository.save(content);
  }


}

