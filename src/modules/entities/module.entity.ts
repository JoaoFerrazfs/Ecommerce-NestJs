import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { AllowedModuleType } from '../enums/modules-type.enum';
import { Banner } from '../../contents/entities/banner.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity('modules')
export class ModuleEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  modulesGroup: ModulesGroup[];
}

export type ModulesGroup = { type: AllowedModuleType; _id: ObjectId };

export type LoadedModules = {
  _id: ObjectId;
  modulesGroup: (Banner | Offer)[];
};
