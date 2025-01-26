import { ModuleBuilderService } from '../../../src/modules/services/module-builder.service';

export const moduleBuilderService = {
  provide: ModuleBuilderService,
  useValue: {
    loadModules: jest.fn(),
  },
};
