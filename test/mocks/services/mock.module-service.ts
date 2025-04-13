import { ModulesService } from '../../../src/modules/services/modules.service';

export const mockModuleService = {
  provide: ModulesService,
  useValue: {
    create: jest.fn().mockResolvedValue(true),
  },
};
