import { Test, TestingModule } from '@nestjs/testing';
import { contentsRepository } from '../../../test/mocks/repositores/mock.contentsRepository';
import { bannersRepository } from '../../../test/mocks/repositores/mock.bannersRepository';
import { BannersService } from './banners.service';
import { ContentsService } from './contents.service';
import { ConfigService } from '@nestjs/config';
import { CreateContentDto } from '../dto/create-content.dto';
import { UpdateContentDto } from '../dto/update-content.dto';
import { ImageHelper } from '../../helpers/image.helper';

describe('Contents Service', () => {
  let service: ContentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentsService,
        contentsRepository,
        bannersRepository,
        BannersService,
        ConfigService,
        ImageHelper,
      ],
    }).compile();

    service = module.get(ContentsService);
  });

  it('should get full view path', async () => {
    // Actions
    const actual = service.getVewPath('test');

    // Assertions
    expect(actual).toEqual('contents/views/test');
  });

  it('should list contents', async () => {
    // Actions
    const actual = await service.list();

    // Assertions
    expect(actual).toEqual([
      {
        banners: [
          {
            image: 'https://localhost/image.jpg',
            title: 'test',
          },
        ],
        name: 'test',
      },
    ]);
  });

  it('should delete content', async () => {
    // Actions
    const actual = await service.delete('677ec5eeb8fc6b91ab73fede');

    // Assertions
    expect(actual).toBeTruthy();
  });

  it('should find content by id', async () => {
    // Actions
    const actual = await service.findById('677ec5eeb8fc6b91ab73fede');

    // Assertions
    expect(actual).toEqual({
      banners: [
        {
          image: 'https://localhost/image.jpg',
          title: 'test',
        },
      ],
      name: 'test',
    });
  });

  it('should create content', async () => {
    // Set

    const expectedCall = {
      banners: [
        {
          image: 'https://localhost/image.jpg',
          title: 'test',
        },
        {
          image: 'https://localhost/image.jpg',
          title: 'test',
        },
      ],
      name: 'test',
    };

    const data = {
      name: 'test',
      banners: ['677ec5eeb8fc6b91ab73fede', '677ecdf5b0b5e2594e8e562d'],
    } as CreateContentDto;

    // Actions
    await service.createContent(data);

    // Assertions
    expect(contentsRepository.useValue.save).toBeCalledWith(expectedCall);
  });

  it('should update a content', async () => {
    // Set

    const expectedCall = {
      banners: [
        {
          image: 'https://localhost/image.jpg',
          title: 'test',
        },
        {
          image: 'https://localhost/image.jpg',
          title: 'test',
        },
      ],
      name: 'test',
    };

    const data = {
      name: 'test',
      banners: ['677ec5eeb8fc6b91ab73fede', '677ecdf5b0b5e2594e8e562d'],
    } as UpdateContentDto;

    // Actions
    await service.update(data, '677ec5eeb8fc6b91ab73fed1');

    // Assertions
    expect(contentsRepository.useValue.save).toBeCalledWith(expectedCall);
  });
});
