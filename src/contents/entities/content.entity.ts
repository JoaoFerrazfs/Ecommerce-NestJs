import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';
import { Banner } from './banner.entity';

@Entity('contents')
export class Content extends BaseEntity {
  @ObjectIdColumn()
  id: string;

  @Column({ default: 'olaaaa' })
  name: string;

  @OneToMany(() => Banner, (banner) => banner.id)
  banners: Banner[];
}
