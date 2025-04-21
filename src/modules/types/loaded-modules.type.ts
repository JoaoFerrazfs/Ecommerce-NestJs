import { LoadedOffer } from '../../offers/entities/offer.entity';
import { Banner } from '../../contents/entities/banner.entity';
import { ObjectId } from 'mongodb';

type ModuleItem =
  | (Partial<Banner> & { type: string })
  | (Partial<LoadedOffer> & { type: string });

export type moduleGroup = ModuleItem;

export type LoadedModulesType = {
  _id: ObjectId;
  modulesGroup: moduleGroup;
  name: string;
};
