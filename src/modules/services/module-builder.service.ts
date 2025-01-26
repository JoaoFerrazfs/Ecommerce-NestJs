import { Injectable } from '@nestjs/common';
import {
  LoadedModules,
  ModuleEntity,
  ModulesGroup,
} from '../entities/module.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from '../../contents/entities/banner.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { AllowedModuleType } from '../enums/modules-type.enum';
import { ObjectId } from 'mongodb';
import { BannersService } from '../../contents/services/banners.service';
import { OffersService } from '../../offers/services/offers.service';
import * as module from 'node:module';

@Injectable()
export class ModuleBuilderService {
  public constructor(
    private readonly bannerService: BannersService,
    private readonly offerService: OffersService,
  ) {}

  public async loadModules(modules: ModuleEntity[]): Promise<LoadedModules[]> {
    return await Promise.all(
      modules.map(async (module) => {
        return {
          _id: module._id,
          modulesGroup: await this.loadModuleComponents(module),
        };
      }),
    );
  }

  private async loadModuleComponents({ modulesGroup }: ModuleEntity) {
    const loadedModules: (Banner | Offer)[] = [];
    for (const module of modulesGroup) {
      const loadedModule = await this.findEntity(module.type, module._id);

      if (!loadedModule) continue;

      loadedModules.push(loadedModule);
    }
    return loadedModules.filter(Boolean);
  }

  private async findEntity(
    type: AllowedModuleType,
    id: ObjectId,
  ): Promise<Banner | Offer | null> {
    if (type == 'offer') {
      return await this.offerService.findOneBy(id);
    }

    return await this.bannerService.findById(id);
  }
}
