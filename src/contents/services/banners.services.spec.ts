import { Test, TestingModule } from '@nestjs/testing';
import { CONTENTS_REPOSITORY as ContentsRepository } from '../../../test/mocks/repositores/mock.contentsRepository';
import { BANNERS_REPOSITORY as BannersRepository } from '../../../test/mocks/repositores/mock.bannersRepository';
import { BannersService } from './banners.service';
import { ContentsService } from './contents.service';
import { ConfigService } from '@nestjs/config';
import { UpdateBannerDto } from '../dto/update-banner.dto';
import { NotFoundException } from '@nestjs/common';

describe('Banner Service', () => {
  let service: BannersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentsService,
        ContentsRepository,
        BannersRepository,
        BannersService,
        ConfigService,
      ],
    }).compile();

    service = module.get(BannersService);
  });

  it('should list banners', async () => {
    // Actions
    const actual = await service.list();

    // Assertions
    expect(actual).toEqual([
      { image: 'https://localhost/image.jpg', title: 'test' },
    ]);
  });

  it('should find a banner by id', async () => {
    // Actions
    const actual = await service.findById('677ec5eeb8fc6b91ab73fede');

    // Assertions
    expect(actual).toEqual({
      image: 'https://localhost/image.jpg',
      title: 'test',
    });
  });

  it('should update a banner', async () => {
    // Set
    const updateBannerDto = {
      title: 'test',
      filename: 'localhost/uploads/image.jpg',
    } as Partial<UpdateBannerDto> & { filename?: string };

    // Actions
    const actual = await service.update(
      '677ec5eeb8fc6b91ab73fede',
      updateBannerDto,
    );

    // Assertions
    expect(actual).toBeTruthy();
  });

  it('should not update found unknown', async () => {
    // Set
    const updateBannerDto = {
      title: 'test',
      filename: 'localhost/uploads/image.jpg',
    } as Partial<UpdateBannerDto> & { filename?: string };
    BannersRepository.useValue.update.mockResolvedValue({
      raw: { matchedCount: 0 },
    });

    // Actions
    const actual = service.update('677ec5eeb8fc6b91ab73fede', updateBannerDto);

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should save a banner', async () => {
    // Set

    // Actions
    const actual = await service.saveBanner(
      'localhost/uploads/image.jpg',
      'test',
    );

    // Assertions
    expect(actual).toEqual({
      image: 'https://localhost/image.jpg',
      title: 'test',
    });
  });
});
