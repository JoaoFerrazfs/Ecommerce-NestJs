import { OpenSearchMapper } from '../../../../src/openSearch/services/mappers/open-search-mapper.service';
import { mockedProduct } from '../../entities/mock.product.entity';

export const MockedOpenSearchMapper = {
  provide: OpenSearchMapper,
  useValue: {
    mapMultipleResults: jest.fn().mockResolvedValue([mockedProduct]),
  },
};
