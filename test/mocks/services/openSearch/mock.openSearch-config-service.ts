import { ConfigService } from '@nestjs/config';

export const MockedOpenSearchConfigService = {
  provide: ConfigService,
  useValue: {
    get: jest.fn().mockReturnValue('http://localhost:9200'),
  },
};
