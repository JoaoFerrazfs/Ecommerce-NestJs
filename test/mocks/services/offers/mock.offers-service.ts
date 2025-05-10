import { OffersService } from '../../../../src/offers/services/offers.service';
import { LoadedOffer } from '../../../../src/offers/entities/offer.entity';
import { ObjectId } from 'mongodb';
import { mockedProduct } from '../../entities/mock.product.entity';

export const loadedOffer: LoadedOffer = {
  _id: new ObjectId('6795315ba07479c68c2e67dd'),
  title: 'test',
  products: [mockedProduct],
} as LoadedOffer;

export const mockedOfferService = {
  provide: OffersService,
  useValue: {
    create: jest.fn(),
    getAllLoadedOffers: jest.fn(),
    getLoadedOffer: jest.fn(),
    delete: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    findAndLoadOneBy: jest.fn().mockResolvedValue(loadedOffer),
  },
};
