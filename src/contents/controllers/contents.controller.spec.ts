import { Test, TestingModule } from '@nestjs/testing';
import { ContentsController } from './contents.controller';
import { ContentsService } from '../services/contents.service';
import { EXPRESS_RESPONSE as responseMock } from '../../../test/mocks/mock.responses';
import { CONTENTS_REPOSITORY as ContentsRepository } from '../../../test/mocks/repositores/mock.contentsRepository';
import { BANNERS_REPOSITORY as BannersRepository } from '../../../test/mocks/repositores/mock.bannersRepository';

describe('Contents Controller', () => {
  let controller: ContentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentsController],
      providers: [ContentsService, ContentsRepository, BannersRepository],
    }).compile();

    controller = module.get(ContentsController);
  });

  it('should render ecommerce homne page', () => {
    // Actions
    controller.contents(responseMock);

    // Assertions
    expect(responseMock.render).toHaveBeenCalledWith('contents/views/home');
  });
});
