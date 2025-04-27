import { Test, TestingModule } from '@nestjs/testing';
import { ModuleBuilderService } from './module-builder.service';
import { mockedBannersService } from '../../../test/mocks/services/mock.banner-service';
import {
  loadedOffer,
  mockedOfferService,
} from '../../../test/mocks/services/mock.offers-service';
import { mockedBanner } from '../../../test/mocks/entities/mock.banner.entity';
import { ModuleEntity, ModulesGroup } from '../entities/module.entity';
import { ObjectId } from 'mongodb';
import { AllowedModuleType } from '../enums/modules-type.enum';

describe('ModuleBuilderService', () => {
  let service: ModuleBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModuleBuilderService,
        mockedBannersService,
        mockedOfferService,
      ],
    }).compile();

    service = module.get(ModuleBuilderService);
  });

  it('test should load modules', async () => {
    // Set
    const id = new ObjectId('6793c558ee32f0ee4b17e1a5');
    const modules: { _id: ObjectId; modulesGroup: ModulesGroup[] }[] = [
      {
        _id: id,
        modulesGroup: [
          {
            _id: new ObjectId('6793c558ee32f0ee4b17e1a8'),
            type: AllowedModuleType.Banner,
          },
          {
            _id: new ObjectId('6793c558ee32f0ee4b17e1a5'),
            type: AllowedModuleType.Offer,
          },
        ],
      },
    ];

    const expected = [
      {
        _id: id,
        modulesGroup: [
          { ...mockedBanner, type: 'banner' },
          { ...loadedOffer, type: 'offer' },
        ],
      },
    ];

    // Actual
    const actual = await service.loadModules(modules as ModuleEntity[]);

    // Expectations
    expect(actual).toEqual(expected);
  });
});
