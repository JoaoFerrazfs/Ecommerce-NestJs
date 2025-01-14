import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from '../entities/banner.entity';
import { Repository } from 'typeorm';
import { UpdateBannerDto } from '../dto/update-banner.dto';
import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class BannersService {
  public constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
    private configService: ConfigService,
  ) {}

  public list(): Promise<Banner[]> {
    return this.bannerRepository.find();
  }

  public findById(id: string): Promise<Banner | null> {
    return this.bannerRepository.findOneBy({ _id: new ObjectId(id) });
  }

  public async update(
    id: string,
    payload: Partial<UpdateBannerDto> & { filename?: string },
  ): Promise<Boolean> {
    const updatePayload = this.buildPayload(payload.title, payload.filename);

    const result = await this.bannerRepository.update(id, updatePayload);

    if (!result.raw.matchedCount) throw new NotFoundException();

    return Boolean(result.affected);
  }

  public saveBanner(fileName: string, title: string): Promise<Banner> {
    const updatePayload = this.buildPayload(title, fileName);

    const banner = this.bannerRepository.create(updatePayload);

    return this.bannerRepository.save(banner);
  }

  public async deleteBanner(id: string): Promise<Boolean> {
    const result = await this.bannerRepository.delete(id);

    return Boolean(result.affected);
  }

  private buildImageURL(fileName: string): string {
    const protocol = this.configService.get('PROTOCOL', 'http');
    const host = this.configService.get('HOST', 'localhost');
    const port = this.configService.get('PORT', '3000');

    return `${protocol}://${host}:${port}/public/uploads/files/${fileName}`;
  }

  private buildPayload(
    title?: string,
    filename?: string,
  ): Partial<UpdateBannerDto> & { image: string } {
    const image = filename ? this.buildImageURL(filename) : undefined;

    return { ...(title && { title }), ...(image && { image }) };
  }
}
