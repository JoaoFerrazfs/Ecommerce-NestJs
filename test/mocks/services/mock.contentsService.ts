import { ContentsService } from '../../../src/contents/services/contents.service';
import { mockedContent } from '../entities/mock.content.entity';

export const contentsService = {
  provide: ContentsService,
  useValue: {
    createContent: jest.fn().mockResolvedValue(mockedContent),
    find: jest.fn().mockResolvedValue(mockedContent),
    delete: jest.fn().mockResolvedValue(true),
    update: jest.fn().mockResolvedValue(mockedContent),
    findById: jest.fn().mockResolvedValue(mockedContent),
    findOne: jest.fn().mockResolvedValue(mockedContent),
    list: jest.fn().mockResolvedValue([mockedContent]),
    getVewPath: jest.fn().mockReturnValue('contents/views/home'),
  },
};
