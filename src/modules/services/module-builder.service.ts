import { Injectable } from '@nestjs/common';
import { ModuleEntity } from '../entities/module.entity';
import { Banner } from '../../contents/entities/banner.entity';
import { LoadedOffer } from '../../offers/entities/offer.entity';
import { AllowedModuleType } from '../enums/modules-type.enum';
import { ObjectId } from 'mongodb';
import { BannersService } from '../../contents/services/banners.service';
import { OffersService } from '../../offers/services/offers.service';
import { LoadedModulesType, moduleGroup } from '../types/loaded-modules.type';

@Injectable()
export class ModuleBuilderService {
  public constructor(
    private readonly bannerService: BannersService,
    private readonly offerService: OffersService,
  ) {}

  public async loadModules(
    modules: ModuleEntity[],
  ): Promise<LoadedModulesType[]> {
    const loadedModules = [];

    for (const module of modules) {
      const modulesGroup = await this.loadModuleComponents(module);

      loadedModules.push({
        _id: module._id,
        name: module.name,
        modulesGroup,
      });
    }

    return loadedModules;
  }

  private async loadModuleComponents(
    modulesGroup: ModuleEntity,
  ): Promise<any[]> {
    const loadedModules = [];

    if (!modulesGroup.modulesGroup) return [];

    for (const module of modulesGroup.modulesGroup) {
      let loadedModule = await this.findEntity(module.type, module._id);

      if (!loadedModule) continue;

      loadedModules.push(loadedModule);
    }

    return loadedModules.filter(Boolean);
  }

  private async findEntity(
    type: AllowedModuleType,
    id: ObjectId,
  ): Promise<moduleGroup | null> {
    if (type == 'offer') {
      const offer = await this.offerService.findAndLoadOneBy(id);
      if (!offer) return null;
      return { ...offer, type: 'offer' };
    }

    const banner = await this.bannerService.findById(id);
    if (!banner) return null;

    return { ...banner, type: 'banner' };
  }
}
