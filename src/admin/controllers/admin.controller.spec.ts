import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from '../services/admin.service';
import { expressResponse } from '../../../test/mocks/mock.responses';

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
    controller.index(expressResponse);

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith('admin/views/home', {
      layout: 'admin',
    });
  });

  it('should render a list of contents', () => {
    // Actions
    controller.contents(expressResponse);

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/listContents',
      { layout: 'admin' },
    );
  });

  it('should render the contents form page in creation mode', () => {
    // Actions
    controller.content(expressResponse);

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/contentsForm',
      {
        layout: 'admin',
      },
    );
  });

  it('should render the contents form page in editing mode', () => {
    // Actions
    controller.edit(expressResponse, '1234');

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/contentsForm',
      {
        id: '1234',
        layout: 'admin',
      },
    );
  });

  it('should render the banner form page in creation mode', () => {
    // Actions
    controller.banner(expressResponse);

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/bannerForm',
      {
        layout: 'admin',
      },
    );
  });

  it('should render the banner form page in editing mode', () => {
    // Actions
    controller.editBanner(expressResponse, '1234');

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/bannerForm',
      {
        layout: 'admin',
        id: '1234',
      },
    );
  });

  it('should render a list of banners', () => {
    // Actions
    controller.banners(expressResponse);

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/listBanners',
      {
        layout: 'admin',
      },
    );
  });
});
