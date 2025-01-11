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
  id: ObjectId;

  @Column({ default: 'olaaaa' })
  name: string;

  @OneToMany(() => Banner, (banner) => banner._id)
  banners: Banner[];
}
