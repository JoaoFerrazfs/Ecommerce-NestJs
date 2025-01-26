import { ModuleEntity } from '../../../src/modules/entities/module.entity';
import { ObjectId } from 'mongodb';
import { AllowedModuleType } from '../../../src/modules/enums/modules-type.enum';

export const mockedModule = new ModuleEntity();
mockedModule.modulesGroup = [
  {
    _id: new ObjectId('6795315ba07479c68c2e67dc'),
    type: AllowedModuleType.Banner,
  },
];
