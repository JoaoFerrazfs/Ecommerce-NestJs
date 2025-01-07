import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('banners')
export class Banner extends BaseEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;
}
