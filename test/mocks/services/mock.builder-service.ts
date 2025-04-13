import { ModuleBuilderService } from '../../../src/modules/services/module-builder.service';
import { LoadedModules } from '../../../src/modules/types/loadedModules';
import { ObjectId } from 'mongodb';
import { mockedBanner } from '../entities/mock.banner.entity';

export const mockedLoadedModule: LoadedModules = {
  _id: new ObjectId('6795315ba07479c68c2e67dc'),
  modulesGroup: [mockedBanner],
};

export const mockBuilderService = {
  provide: ModuleBuilderService,
  useValue: {
    loadModules: jest.fn().mockResolvedValue(mockedLoadedModule),
  },
};
