import { ContentsService } from '../../../src/contents/services/contents.service';
import { Content } from '../../../src/contents/entities/content.entity';
import { mockedBanner } from './mock.bannerService';

const content = {
  name: 'test',
  banners: [mockedBanner],
} as Content;

export const CONTENTS_SERVICE = {
  provide: ContentsService,
  useValue: {
    createContent: jest.fn().mockResolvedValue(content),
    find: jest.fn().mockResolvedValue(content),
    delete: jest.fn().mockResolvedValue(true),
    update: jest.fn().mockResolvedValue(content),
    list: jest.fn().mockResolvedValue([content]),
  },
};
