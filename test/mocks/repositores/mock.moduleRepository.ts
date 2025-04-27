import { getRepositoryToken } from '@nestjs/typeorm';
import { ModuleEntity } from '../../../src/modules/entities/module.entity';
import { mockedModuleWithBanner } from '../entities/mock.module.entity';

const updateResult = { affected: true };
const deleteResult = { affected: true };

export const mockModuleRepository = {
  provide: getRepositoryToken(ModuleEntity),
  useValue: {
    find: jest.fn().mockResolvedValue([mockedModuleWithBanner]),
    findOneBy: jest.fn().mockResolvedValue([mockedModuleWithBanner]),
    findOne: jest.fn().mockResolvedValue(mockedModuleWithBanner),
    create: jest.fn().mockResolvedValue(mockedModuleWithBanner),
    save: jest.fn().mockResolvedValue(mockedModuleWithBanner),
    update: jest.fn().mockResolvedValue(updateResult),
    delete: jest.fn().mockResolvedValue(deleteResult),
  },
};
