import { OffersService } from '../../../src/offers/services/offers.service';

export const offerService = {
  provide: OffersService,
  useValue: {
    create: jest.fn(),
    getAllLoadedOffers: jest.fn(),
    getLoadedOffer: jest.fn(),
    delete: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
  },
};
