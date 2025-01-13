import { getRepositoryToken } from '@nestjs/typeorm';
import { Banner } from '../../../src/contents/entities/banner.entity';

export const BANNERS_REPOSITORY = {
  provide: getRepositoryToken(Banner),
  useValue: {
    update: jest.fn().mockResolvedValue(true),
  },
};
