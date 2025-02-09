import { Test } from '@nestjs/testing';
import { offerService } from '../../../test/mocks/services/mock.offers-service';
import { bannersService } from '../../../test/mocks/services/mock.banner-service';
import { ValidateStoredIdPipe } from './validate-stored-id.pipe';
import { ArgumentMetadata, UnprocessableEntityException } from '@nestjs/common';
import { mockedOffer } from '../../../test/mocks/entities/mock.offer.entity';
import { CreateModuleDto, CreateModulesDto } from '../dto/create-module.dto';
import { AllowedModuleType } from '../enums/modules-type.enum';
import { ObjectId } from 'mongodb';

describe('Validate stored id', () => {
  let validateStoredIdPipe: ValidateStoredIdPipe;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [bannersService, offerService, ValidateStoredIdPipe],
    }).compile();

    validateStoredIdPipe = await moduleRef.resolve(ValidateStoredIdPipe);
  });

  it('should verify the existence of an id', async () => {
    // Set
    const payload = new CreateModulesDto();
    payload.modules = [
      {
        _id: new ObjectId('6795315ba07479c68c2e67dc'),
        type: AllowedModuleType.Banner,
      } as CreateModuleDto,
    ];

    const metadata = {} as ArgumentMetadata;

    // Expectation
    offerService.useValue.findOneBy.mockResolvedValue(mockedOffer);
    bannersService.useValue.findById.mockResolvedValue(null);

    // Actions
    const actual = await validateStoredIdPipe.transform(payload, metadata);

    // Assertions
    expect(actual).toEqual(payload);
  });

  it('should invalidate an id', async () => {
    // Set
    const payload = new CreateModulesDto();
    payload.modules = [
      {
        _id: new ObjectId('6795315ba07479c68c2e67dc'),
        type: AllowedModuleType.Banner,
      } as CreateModuleDto,
    ];

    const metadata = {} as ArgumentMetadata;

    // Expectation
    offerService.useValue.findOneBy.mockResolvedValue(null);
    bannersService.useValue.findById.mockResolvedValue(null);

    // Actions
    const actual = validateStoredIdPipe.transform(payload, metadata);

    // Assertions
    await expect(actual).rejects.toBeInstanceOf(UnprocessableEntityException);
  });
});
