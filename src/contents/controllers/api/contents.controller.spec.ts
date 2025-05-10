import { Test, TestingModule } from '@nestjs/testing';
import { contentsRepository } from '../../../../test/mocks/repositores/mock.contentsRepository';
import { bannersRepository } from '../../../../test/mocks/repositores/mock.bannersRepository';
import { mockedBannersService } from '../../../../test/mocks/services/contents/mock.banner-service';
import { contentsService } from '../../../../test/mocks/services/contents/mock.contents-service';
import { ContentsController } from './contents.controller';
import { CreateContentDto } from '../../dto/create-content.dto';
import { UpdateContentDto } from '../../dto/update-content.dto';
import { ObjectId } from 'mongodb';

describe('Api Banners Controller', () => {
  let controller: ContentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentsController],
      providers: [
        mockedBannersService,
        contentsRepository,
        bannersRepository,
        contentsService,
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
        modules: ['6795315ba07479c68c2e67dc'],
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
          modules: ['6795315ba07479c68c2e67dc'],
          name: 'test',
        },
      ],
    });
  });

  it.each([['6793c558ee32f0ee4b17e1a5'], ['home']])(
    'should find a banner',
    async (identifier: string) => {
      // Actions
      const actual = await controller.find(identifier);

      // Assertions
      identifier.length === 24
        ? expect(contentsService.useValue.findById).toHaveBeenCalledWith(
            new ObjectId(identifier),
          )
        : expect(contentsService.useValue.findOne).toHaveBeenCalledWith({
            name: identifier,
          });

      expect(actual).toEqual({
        data: {
          modules: ['6795315ba07479c68c2e67dc'],
          name: 'test',
        },
      });
    },
  );

  it('should update a banners', async () => {
    // Set
    const updateContentDto = { name: 'test' } as UpdateContentDto;

    // Actions
    const actual = await controller.update(updateContentDto, '123');

    // Assertions
    expect(actual).toEqual({
      data: {
        modules: ['6795315ba07479c68c2e67dc'],
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
