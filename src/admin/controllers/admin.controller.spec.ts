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

  it('should render a list of products', () => {
    // Actions
    controller.products(expressResponse);

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/listProducts',
      {
        layout: 'admin',
      },
    );
  });

  it('should render the product form page in creation mode', () => {
    // Actions
    controller.createProduct(expressResponse);

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/productForm',
      {
        layout: 'admin',
      },
    );
  });

  it('should render the product form page in edit mode', () => {
    // Actions
    controller.editProduct(expressResponse, '1234');

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/productForm',
      {
        layout: 'admin',
        id: '1234',
      },
    );
  });

  it('should render the product images list', () => {
    // Actions
    controller.editProductImages(expressResponse, '1234');

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/listProductImages',
      {
        layout: 'admin',
        id: '1234',
      },
    );
  });

  it('should render a list of modules', () => {
    // Actions
    controller.modules(expressResponse);

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/listModules',
      {
        layout: 'admin',
      },
    );
  });

  it('should render the module form page in creation mode', () => {
    // Actions
    controller.createModules(expressResponse);

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/moduleForm',
      {
        layout: 'admin',
      },
    );
  });

  it('should render the module form page in edit mode', () => {
    // Actions
    controller.editModules(expressResponse, '1234');

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/moduleForm',
      {
        layout: 'admin',
        id: '1234',
      },
    );
  });

  it('should render a list of offers', () => {
    // Actions
    controller.offers(expressResponse);

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/listOffers',
      {
        layout: 'admin',
      },
    );
  });

  it('should render the offer form page in creation mode', () => {
    // Actions
    controller.createOffers(expressResponse);

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/offerForm',
      {
        layout: 'admin',
      },
    );
  });

  it('should render the offer form page in edit mode', () => {
    // Actions
    controller.editOffers(expressResponse, '1234');

    // Assertions
    expect(expressResponse.render).toHaveBeenCalledWith(
      'admin/views/offerForm',
      {
        layout: 'admin',
        id: '1234',
      },
    );
  });
});
