import { LoadedOffer } from '../../offers/entities/offer.entity';
import { Banner } from '../../contents/entities/banner.entity';
import { ObjectId } from 'mongodb';

export type moduleGroup = (Banner | LoadedOffer | [])[];

export type LoadedModulesType = {
  _id: ObjectId;
  modulesGroup: moduleGroup;
  name: string;
};
