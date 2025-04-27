import { ModuleBuilderService } from '../../../src/modules/services/module-builder.service';
import { LoadedModulesType } from '../../../src/modules/types/loaded-modules.type';
import { ObjectId } from 'mongodb';
import { mockedBanner } from '../entities/mock.banner.entity';

export const mockedLoadedModule: LoadedModulesType = {
  _id: new ObjectId('6795315ba07479c68c2e67dc'),
  modulesGroup: { ...mockedBanner, type: 'object' },
  name: 'test',
};

export const mockBuilderService = {
  provide: ModuleBuilderService,
  useValue: {
    loadModules: jest.fn().mockResolvedValue(mockedLoadedModule),
  },
};
