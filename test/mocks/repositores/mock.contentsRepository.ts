import { Content } from '../../../src/contents/entities/content.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockedContent } from '../entities/mock.content.entity';

export const CONTENTS_REPOSITORY = {
  provide: getRepositoryToken(Content),
  useValue: {
    update: jest.fn().mockResolvedValue(true),
    find: jest.fn().mockResolvedValue([mockedContent]),
    save: jest.fn().mockResolvedValue(mockedContent),
    delete: jest.fn().mockResolvedValue({ affected: true }),
    findOneBy: jest.fn().mockResolvedValue(mockedContent),
  },
};
