import { getRepositoryToken } from '@nestjs/typeorm';
import { Offer } from '../../../src/offers/entities/offer.entity';

export const offersRepository = {
  provide: getRepositoryToken(Offer),
  useValue: {
    update: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findOneBy: jest.fn(),
  },
};
