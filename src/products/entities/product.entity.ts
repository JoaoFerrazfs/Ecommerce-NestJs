import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectIdColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';
import { Unit } from '../enums/unit-enum';
import { Image } from './image-product.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity('products')
export class Product extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  cod: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'double' })
  price: number;

  @Column({ type: 'string', enum: Unit })
  unit: Unit;

  @Column({ type: 'double' })
  stock: number;

  @Column()
  images: Image[];
}
