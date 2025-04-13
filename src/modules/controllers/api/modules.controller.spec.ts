import { Test, TestingModule } from '@nestjs/testing';
import { ModulesController } from './modules.controller';
import { modulesService } from '../../../../test/mocks/services/mock.modules-service';
import { CreateModulesDto } from '../../dto/create-module.dto';
import { mockedModuleWithBanner } from '../../../../test/mocks/entities/mock.module.entity';
import { mockedBannersService } from '../../../../test/mocks/services/mock.banner-service';
import { mockedOfferService } from '../../../../test/mocks/services/mock.offers-service';
import { moduleBuilderService } from '../../../../test/mocks/services/mock.modules-builder-service';
import { UpdateModuleDto } from '../../dto/update-module.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ModulesController', () => {
  let controller: ModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModulesController],
      providers: [
        modulesService,
        mockedBannersService,
        mockedOfferService,
        moduleBuilderService,
      ],
    }).compile();

    controller = module.get(ModulesController);
  });

  it('should create a module', async () => {
    // Set
    const createModuleDto = {} as CreateModulesDto;

    //Expectations
    modulesService.useValue.create.mockResolvedValue(mockedModuleWithBanner);

    // Actions
    const actual = await controller.create(createModuleDto);

    // Assertions
    expect(actual).toEqual({ data: mockedModuleWithBanner });
    expect(modulesService.useValue.create).toBeCalledWith(createModuleDto);
  });

  it('should update a module', async () => {
    // Set
    const id = '6795315ba07479c68c2e67dc';
    const updateModuleDto = {} as UpdateModuleDto;

    //Expectations
    modulesService.useValue.findOne.mockResolvedValue(mockedModuleWithBanner);
    modulesService.useValue.update.mockResolvedValue(true);

    // Actions
    const actual = await controller.update(updateModuleDto, id);

    // Assertions
    expect(actual).toEqual(undefined);
    expect(modulesService.useValue.findOne).toBeCalledWith(id);
    expect(modulesService.useValue.update).toBeCalledWith(id, updateModuleDto);
  });

  it('should not update a not found module', async () => {
    // Set
    const id = '6795315ba07479c68c2e67dc';
    const updateModuleDto = {} as UpdateModuleDto;

    //Expectations
    modulesService.useValue.findOne.mockResolvedValue(null);

    // Actions
    const actual = controller.update(updateModuleDto, id);

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
    expect(modulesService.useValue.findOne).toBeCalledWith(id);
  });

  it('should not update a module with errors', async () => {
    // Set
    const id = '6795315ba07479c68c2e67dc';
    const updateModuleDto = {} as UpdateModuleDto;

    //Expectations
    modulesService.useValue.findOne.mockResolvedValue(mockedModuleWithBanner);
    modulesService.useValue.update.mockResolvedValue(false);

    // Actions
    const actual = controller.update(updateModuleDto, id);

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(BadRequestException);
    expect(modulesService.useValue.findOne).toBeCalledWith(id);
    expect(modulesService.useValue.update).toBeCalledWith(id, updateModuleDto);
  });

  it('should find all modules', async () => {
    //Expectations
    modulesService.useValue.findAll.mockResolvedValue([mockedModuleWithBanner]);

    // Actions
    const actual = await controller.findAll();

    // Assertions
    expect(actual).toEqual({ data: [mockedModuleWithBanner] });
  });

  it('should find all loaded modules', async () => {
    //Expectations
    modulesService.useValue.findAllLoaded.mockResolvedValue([
      mockedModuleWithBanner,
    ]);

    // Actions
    const actual = await controller.findAllLoaded();

    // Assertions
    expect(actual).toEqual({ data: [mockedModuleWithBanner] });
  });

  it('should find a module', async () => {
    // Set
    const id = '6795315ba07479c68c2e67dc';
    //Expectations
    modulesService.useValue.findOne.mockResolvedValue(mockedModuleWithBanner);

    // Actions
    const actual = await controller.findOne(id);

    // Assertions
    expect(actual).toEqual({ data: mockedModuleWithBanner });
    expect(modulesService.useValue.findOne).toBeCalledWith(id);
  });

  it('should not find a module', async () => {
    // Set
    const id = '6795315ba07479c68c2e67dc';
    //Expectations
    modulesService.useValue.findOne.mockResolvedValue(null);

    // Actions
    const actual = controller.findOne(id);

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
    expect(modulesService.useValue.findOne).toBeCalledWith(id);
  });

  it('should delete a module', async () => {
    // Set
    const id = '6795315ba07479c68c2e67dc';

    //Expectations
    modulesService.useValue.delete.mockResolvedValue(true);

    // Actions
    const actual = await controller.delete(id);

    // Assertions
    expect(actual).toBeUndefined();
    expect(modulesService.useValue.delete).toBeCalledWith(id);
  });

  it('should not delete a module', async () => {
    // Set
    const id = '6795315ba07479c68c2e67dc';

    //Expectations
    modulesService.useValue.delete.mockResolvedValue(false);

    // Actions
    const actual = controller.delete(id);

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
    expect(modulesService.useValue.delete).toBeCalledWith(id);
  });
});
