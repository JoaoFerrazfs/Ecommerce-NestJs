import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from '../services/admin.service';
import { EXPRESS_RESPONSE as responseMock } from '../../../test/mocks/mock.responses';

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService],
    }).compile();

    controller = module.get(AdminController);
  });

  it('should render the admin welcome page', () => {
    // Actions
    controller.index(responseMock);

    // Assertions
    expect(responseMock.render).toHaveBeenCalledWith(
      'contents/views/adminHome',
      { layout: 'admin' },
    );
  });

  it('should render a list of contents', () => {
    // Actions
    controller.contents(responseMock);

    // Assertions
    expect(responseMock.render).toHaveBeenCalledWith(
      'contents/views/listContents',
      { layout: 'admin' },
    );
  });

  it('should render the contents form page in creation mode', () => {
    // Actions
    controller.content(responseMock);

    // Assertions
    expect(responseMock.render).toHaveBeenCalledWith(
      'contents/views/adminContentsForm',
      {
        layout: 'admin',
      },
    );
  });

  it('should render the contents form page in editing mode', () => {
    // Actions
    controller.edit(responseMock, '1234');

    // Assertions
    expect(responseMock.render).toHaveBeenCalledWith(
      'contents/views/adminContentsForm',
      {
        id: '1234',
        layout: 'admin',
      },
    );
  });

  it('should render the banner form page in creation mode', () => {
    // Actions
    controller.banner(responseMock);

    // Assertions
    expect(responseMock.render).toHaveBeenCalledWith(
      'contents/views/adminBannerForm',
      {
        layout: 'admin',
      },
    );
  });

  it('should render the banner form page in editing mode', () => {
    // Actions
    controller.editBanner(responseMock, '1234');

    // Assertions
    expect(responseMock.render).toHaveBeenCalledWith(
      'contents/views/adminBannerForm',
      {
        layout: 'admin',
        id: '1234',
      },
    );
  });

  it('should render a list of banners', () => {
    // Actions
    controller.banners(responseMock);

    // Assertions
    expect(responseMock.render).toHaveBeenCalledWith(
      'contents/views/listBanners',
      {
        layout: 'admin',
      },
    );
  });
});
