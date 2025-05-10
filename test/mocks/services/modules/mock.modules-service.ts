import { ModulesService } from '../../../../src/modules/services/modules.service';

export const modulesService = {
  provide: ModulesService,
  useValue: {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findAllLoaded: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  },
};
