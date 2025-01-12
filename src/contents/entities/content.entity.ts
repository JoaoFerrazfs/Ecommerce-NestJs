import {
  BaseEntity,
  Column,
  Entity,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';
import { Banner } from './banner.entity';
import { ObjectId } from 'mongodb';

@Entity('contents')
export class Content extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  banners: Banner[];
}
