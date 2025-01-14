import { getRepositoryToken } from '@nestjs/typeorm';
import { Banner } from '../../../src/contents/entities/banner.entity';
import { mockedBanner } from '../entities/mock.banner.entity';

export const BANNERS_REPOSITORY = {
  provide: getRepositoryToken(Banner),
  useValue: {
    find: jest.fn().mockResolvedValue([mockedBanner]),
    findOneBy: jest.fn().mockResolvedValue(mockedBanner),
    create: jest.fn().mockResolvedValue(mockedBanner),
    save: jest.fn().mockResolvedValue(mockedBanner),
    update: jest
      .fn()
      .mockResolvedValue({ raw: { matchedCount: 1 }, affected: true }),
  },
};
