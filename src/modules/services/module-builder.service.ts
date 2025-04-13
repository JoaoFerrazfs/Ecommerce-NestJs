import { Injectable } from '@nestjs/common';
import { ModuleEntity } from '../entities/module.entity';
import { Banner } from '../../contents/entities/banner.entity';
import { LoadedOffer } from '../../offers/entities/offer.entity';
import { AllowedModuleType } from '../enums/modules-type.enum';
import { ObjectId } from 'mongodb';
import { BannersService } from '../../contents/services/banners.service';
import { OffersService } from '../../offers/services/offers.service';
import { LoadedModules, moduleGroup } from '../types/loadedModules';

@Injectable()
export class ModuleBuilderService {
  public constructor(
    private readonly bannerService: BannersService,
    private readonly offerService: OffersService,
  ) {}

  public async loadModules(modules: ModuleEntity[]): Promise<LoadedModules[]> {
    const loadedModules: LoadedModules[] = [];

    for (const module of modules) {
      const modulesGroup = await this.loadModuleComponents(module);

      loadedModules.push({
        _id: module._id,
        modulesGroup,
      });
    }

    return loadedModules;
  }

  private async loadModuleComponents({
    modulesGroup,
  }: ModuleEntity): Promise<moduleGroup> {
    const loadedModules: moduleGroup = [];
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
  ): Promise<Banner | LoadedOffer | null> {
    if (type == 'offer') {
      return await this.offerService.findAndLoadOneBy(id);
    }

    return await this.bannerService.findById(id);
  }
}
