import { Test, TestingModule } from '@nestjs/testing';
import { ContentsService } from '../../services/contents.service';
import { CONTENTS_REPOSITORY as MockContentsRepository } from '../../../../test/mocks/repositores/mock.contentsRepository';
import { BANNERS_REPOSITORY as MockBannersRepository } from '../../../../test/mocks/repositores/mock.bannersRepository';
import { BannerController as ApiBannersController } from './banners.controller';
import { UpdateBannerDto } from '../../dto/update-banner.dto';
import { BANNERS_SERVICE as MockBannerService } from '../../../../test/mocks/services/mock.bannerService';
import { Banner } from '../../entities/banner.entity';
import { CreateBannerDto } from '../../dto/create-banner.dto';
import { NotFoundException } from '@nestjs/common';

describe('Api Banners Controller', () => {
  let controller: ApiBannersController;
  let bannersServiceMock: jest.Mocked<typeof MockBannerService.useValue>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiBannersController],
      providers: [
        ContentsService,
        MockBannerService,
        MockContentsRepository,
        MockBannersRepository,
      ],
    }).compile();

    controller = module.get(ApiBannersController);
    bannersServiceMock = module.get(MockBannerService.provide);
  });

  it('should update a banner', () => {
    // Set
    const file = { filename: 'file_test.jpg' } as Express.Multer.File;
    const updateBannerDto = { title: 'test' } as UpdateBannerDto;

    // Actions
    controller.edit('123', [file], updateBannerDto);

    // Assertions
    expect(bannersServiceMock.update).toHaveBeenCalledWith('123', {
      filename: 'file_test.jpg',
      title: 'test',
    });
  });

  it('should find a banner', async () => {
    // Actions
    const actual = await controller.findById('123');

    // Assertions
    expect(actual).toEqual({
      data: { image: 'https://localhost/image.jpg', title: 'test' } as Banner,
    });
  });

  it('should store a banner', async () => {
    // Set
    const file = { filename: 'file_test.jpg' } as Express.Multer.File;
    const createBannerDto = { title: 'test' } as CreateBannerDto;

    // Actions
    const actual = await controller.store([file], createBannerDto);

    // Assertions
    expect(actual).toEqual({
      data: { image: 'https://localhost/image.jpg', title: 'test' } as Banner,
    });
  });

  it('should delete a banner', async () => {
    // Actions
    await controller.delete('123');

    // Assertions
    expect(bannersServiceMock.deleteBanner).toHaveBeenCalledWith('123');
  });

  it('should not delete a banner and throw a NotFoundException', async () => {
    // Set
    bannersServiceMock.deleteBanner.mockResolvedValue(false);

    // Actions
    const actual = controller.delete('123');

    // Assertions
    await expect(actual).rejects.toEqual(
      new NotFoundException('Não foi possivel realizar a deleção'),
    );
  });

  it('should list banners', async () => {
    // Actions
    const actual = await controller.listBanners();

    // Assertions
    expect(actual).toEqual({
      data: [{ image: 'https://localhost/image.jpg', title: 'test' } as Banner],
    });
  });
});
