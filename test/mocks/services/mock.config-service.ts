import { ConfigService } from '@nestjs/config';

export const configService = {
  provide: ConfigService,
  useValue: {
    get: jest.fn(),
  },
};
