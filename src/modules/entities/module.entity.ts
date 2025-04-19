import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { AllowedModuleType } from '../enums/modules-type.enum';

@Entity('modules')
export class ModuleEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  modulesGroup: ModulesGroup[];

  @Column()
  name: string;
}

export type ModulesGroup = { type: AllowedModuleType; _id: ObjectId };
