import { Test, TestingModule } from '@nestjs/testing';
import { ModulesService } from './modules.service';
import { CreateModulesDto } from '../dto/create-module.dto';
import {
  mockBuilderService,
  mockedLoadedModule,
} from '../../../test/mocks/services/mock.builder-service';
import { mockModuleRepository } from '../../../test/mocks/repositores/mock.moduleRepository';
import { mockedModuleWithBanner } from '../../../test/mocks/entities/mock.module.entity';
import { ObjectId } from 'mongodb';
import { AllowedModuleType } from '../enums/modules-type.enum';
import { UpdateModuleDto } from '../dto/update-module.dto';

describe('ModulesService', () => {
  let service: ModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModulesService, mockBuilderService, mockModuleRepository],
    }).compile();

    service = module.get(ModulesService);
  });

  it('should create a Module', async () => {
    // Set
    const createModulesDto = new CreateModulesDto();
    createModulesDto.modules = [
      {
        _id: new ObjectId('6795315ba07479c68c2e67dc'),
        type: AllowedModuleType.Offer,
      },
    ];

    // Actions
    const actual = await service.create(createModulesDto);

    // Assertions
    expect(mockModuleRepository.useValue.create).toBeCalledWith({
      modulesGroup: createModulesDto.modules,
    });
    expect(mockModuleRepository.useValue.save).toBeCalledWith(
      mockedModuleWithBanner,
    );
    expect(actual).toBe(mockedModuleWithBanner);
  });

  it('should update a Module', async () => {
    // Set
    const id = '6793c558ee32f0ee4b17e1a5';
    const updateModulesDto = new UpdateModuleDto();
    updateModulesDto.modules = [
      {
        _id: new ObjectId('6795315ba07479c68c2e67dc'),
        type: AllowedModuleType.Offer,
      },
    ];

    // Actions
    const actual = await service.update(id, updateModulesDto);

    // Assertions
    expect(mockModuleRepository.useValue.findOne).toBeCalledWith({
      where: { _id: new ObjectId(id) },
    });

    expect(mockModuleRepository.useValue.save).toBeCalledWith(
      mockedModuleWithBanner,
    );
    expect(actual).toBeTruthy();
  });

  it('should find all modules', async () => {
    // Actions
    const actual = await service.findAll();

    // Assertions
    expect(mockModuleRepository.useValue.find).toBeCalled();
    expect(actual).toStrictEqual([mockedModuleWithBanner]);
  });

  it('should find all loaded modules', async () => {
    // Actions
    const actual = await service.findAllLoaded();

    // Assertions
    expect(mockModuleRepository.useValue.find).toBeCalled();
    expect(mockBuilderService.useValue.loadModules).toBeCalledWith([
      mockedModuleWithBanner,
    ]);
    expect(actual).toStrictEqual(mockedLoadedModule);
  });

  it('should find a modules', async () => {
    // Set
    const id = '6795315ba07479c68c2e67dc';

    // Actions
    const actual = await service.findOne(id);

    // Assertions
    expect(mockModuleRepository.useValue.findOneBy).toBeCalledWith({
      _id: new ObjectId(id),
    });
    expect(actual).toStrictEqual([mockedModuleWithBanner]);
  });

  it('should delete a module', async () => {
    // Set
    const id = '6795315ba07479c68c2e67dc';

    // Actions
    const actual = await service.findOne(id);

    // Assertions
    expect(mockModuleRepository.useValue.findOneBy).toBeCalledWith({
      _id: new ObjectId(id),
    });
    expect(actual).toBeTruthy();
  });
});
