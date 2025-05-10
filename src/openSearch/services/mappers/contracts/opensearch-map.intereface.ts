import { BaseEntity } from 'typeorm';

export interface IndexMapInterface {
  map(data: any): BaseEntity;
}
