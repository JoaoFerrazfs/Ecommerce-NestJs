import { BannersService } from '../../../src/contents/services/banners.service';
import { mockedBanner } from '../entities/mock.banner.entity';

export const BANNERS_SERVICE = {
  provide: BannersService,
  useValue: {
    update: jest.fn().mockResolvedValue(true),
    findById: jest.fn().mockResolvedValue(mockedBanner),
    saveBanner: jest.fn().mockResolvedValue(mockedBanner),
    deleteBanner: jest.fn().mockResolvedValue(true),
    list: jest.fn().mockResolvedValue([mockedBanner]),
  },
};
