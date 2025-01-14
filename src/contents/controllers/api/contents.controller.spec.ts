import { Test, TestingModule } from '@nestjs/testing';
import { ContentsService } from '../../services/contents.service';
import { CONTENTS_REPOSITORY as MockContentsRepository } from '../../../../test/mocks/repositores/mock.contentsRepository';
import { BANNERS_REPOSITORY as MockBannersRepository } from '../../../../test/mocks/repositores/mock.bannersRepository';
import { BANNERS_SERVICE as MockBannerService } from '../../../../test/mocks/services/mock.bannerService';
import { CONTENTS_SERVICE as MockContentsService } from '../../../../test/mocks/services/mock.contentsService';
import { ContentsController } from './contents.controller';
import { CreateContentDto } from '../../dto/create-content.dto';
import { UpdateContentDto } from '../../dto/update-content.dto';

describe('Api Banners Controller', () => {
  let controller: ContentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentsController],
      providers: [
        MockBannerService,
        MockContentsRepository,
        MockBannersRepository,
        MockContentsService,
      ],
    }).compile();

    controller = module.get(ContentsController);
  });

  it('should create a banner', async () => {
    // Set
    const createContentDto = { name: 'test' } as CreateContentDto;

    // Actions
    const actual = await controller.createContent(createContentDto);

    // Assertions
    expect(actual).toEqual({
      data: {
        banners: [
          {
            image: 'https://localhost/image.jpg',
            title: 'test',
          },
        ],
        name: 'test',
      },
    });
  });

  it('should list banners', async () => {
    // Actions
    const actual = await controller.list();

    // Assertions
    expect(actual).toEqual({
      data: [
        {
          banners: [
            {
              image: 'https://localhost/image.jpg',
              title: 'test',
            },
          ],
          name: 'test',
        },
      ],
    });
  });

  it('should find a banner', async () => {
    // Actions
    const actual = await controller.find('123');

    // Assertions
    expect(actual).toEqual({
      data: {
        banners: [
          {
            image: 'https://localhost/image.jpg',
            title: 'test',
          },
        ],
        name: 'test',
      },
    });
  });

  it('should update a banners', async () => {
    // Set
    const updateContentDto = { name: 'test' } as UpdateContentDto;
    // Actions
    const actual = await controller.update(updateContentDto, '123');

    // Assertions
    expect(actual).toEqual({
      data: {
        banners: [
          {
            image: 'https://localhost/image.jpg',
            title: 'test',
          },
        ],
        name: 'test',
      },
    });
  });

  it('should delete a banners', async () => {
    // Actions
    const actual = await controller.delete('123');

    // Assertions
    expect(actual).toEqual({ data: true });
  });
});
