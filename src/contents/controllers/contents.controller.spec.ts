import { Test, TestingModule } from '@nestjs/testing';
import { ContentsController } from './contents.controller';
import { expressResponse as responseMock } from '../../../test/mocks/mock.responses';
import { contentsRepository } from '../../../test/mocks/repositores/mock.contentsRepository';
import { bannersRepository } from '../../../test/mocks/repositores/mock.bannersRepository';
import { contentsService } from '../../../test/mocks/services/contents/mock.contents-service';

describe('Contents Controller', () => {
  let controller: ContentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentsController],
      providers: [contentsService, contentsRepository, bannersRepository],
    }).compile();

    controller = module.get(ContentsController);
  });

  it('should render ecommerce home page', async () => {
    // Actions
    await controller.contents(responseMock);

    // Assertions
    expect(responseMock.render).toHaveBeenCalledWith('contents/views/home');
  });
});
