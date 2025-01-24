import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';
import { ObjectId } from 'mongodb';
import { Product } from '../../products/entities/product.entity';

@Entity('offers')
export class Offer extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  title: string;

  @Column()
  products: ObjectId[];
}

export type LoadedOffer = {
  _id: ObjectId;
  title: string;
  products: Product[];
};
