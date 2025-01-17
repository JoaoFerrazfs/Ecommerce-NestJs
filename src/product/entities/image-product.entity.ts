import { BaseEntity } from 'typeorm';

export class Image extends BaseEntity {
  constructor(
    private readonly alt: string,
    private readonly path: string,
  ) {
    super();
  }
}
