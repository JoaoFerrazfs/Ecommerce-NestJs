import { Content } from '../../../src/contents/entities/content.entity';
import { mockedBanner } from './mock.banner.entity';

export const mockedContent = new Content();
mockedContent.name = 'test';
mockedContent.banners = [mockedBanner];
