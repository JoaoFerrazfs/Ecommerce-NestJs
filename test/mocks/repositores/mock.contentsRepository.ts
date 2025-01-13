import { Content } from '../../../src/contents/entities/content.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export const CONTENTS_REPOSITORY = {
  provide: getRepositoryToken(Content),
  useValue: {
    update: jest.fn().mockResolvedValue(true),
  },
};
