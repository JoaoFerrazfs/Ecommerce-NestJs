import { Test, TestingModule } from '@nestjs/testing';
import { ContentsController } from './contents.controller';
import { EXPRESS_RESPONSE as responseMock } from '../../../test/mocks/mock.responses';
import { CONTENTS_REPOSITORY as ContentsRepository } from '../../../test/mocks/repositores/mock.contentsRepository';
import { BANNERS_REPOSITORY as BannersRepository } from '../../../test/mocks/repositores/mock.bannersRepository';
import { CONTENTS_SERVICE } from '../../../test/mocks/services/mock.contentsService';

describe('Contents Controller', () => {
  let controller: ContentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentsController],
      providers: [CONTENTS_SERVICE, ContentsRepository, BannersRepository],
    }).compile();

    controller = module.get(ContentsController);
  });

  it('should render ecommerce homne page', async () => {
    // Actions
    await controller.contents(responseMock);

    // Assertions
    expect(responseMock.render).toHaveBeenCalledWith('contents/views/home', {
      banners: [{ image: 'https://localhost/image.jpg', title: 'test' }],
    });
  });
});
