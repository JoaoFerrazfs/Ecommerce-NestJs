import {
  BaseEntity,
  Column,
  Entity,
  ObjectIdColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectId } from 'mongodb';
import { Content } from './content.entity';

@Entity('banners')
export class Banner extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  title: string;

  @Column()
  image: string;

  @ManyToOne(() => Content, content => content.banners)
  content: Content;
}
