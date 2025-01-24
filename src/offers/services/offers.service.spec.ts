import { Test, TestingModule } from '@nestjs/testing';
import { OffersService } from './offers.service';
import { OffersController } from '../controllers/api/offers.controller';
import { offersRepository } from '../../../test/mocks/repositores/mock.OffersRepository';
import { productsRepository } from '../../../test/mocks/repositores/mock.ProductsRepository';
import { mockedOffer } from '../../../test/mocks/entities/mock.offer.entity';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { ObjectId } from 'mongodb';
import { mockedProduct } from '../../../test/mocks/entities/mock.product.entity';

describe('OffersService', () => {
  let service: OffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [OffersService, productsRepository, offersRepository],
    }).compile();

    service = module.get(OffersService);
    jest.resetAllMocks();
  });

  it('should be create a offer', async () => {
    // Set
    const data = {
      title: 'optimist',
      products: ['679271f302e8562ae6ce2484'],
    } as CreateOfferDto;

    // Expectations
    offersRepository.useValue.create.mockReturnValue(mockedOffer);
    offersRepository.useValue.save.mockReturnValue(mockedOffer);

    // Actions
    const actual = await service.create(data);

    // Assertions
    expect(actual).toEqual(mockedOffer);
    expect(offersRepository.useValue.create).toHaveBeenCalledWith({
      title: 'optimist',
      products: [new ObjectId('679271f302e8562ae6ce2484')],
    });
    expect(offersRepository.useValue.save).toHaveBeenCalledWith({
      ...mockedOffer,
      products: [new ObjectId('679271f302e8562ae6ce2484')],
    });
  });

  it('should get loaded offers', async () => {
    // Set
    const data = {
      title: 'optimist',
      products: ['679271f302e8562ae6ce2484'],
    } as CreateOfferDto;

    // Expectations
    offersRepository.useValue.find.mockReturnValue([
      { ...mockedOffer, _id: new ObjectId('679271f302e8562ae6ce2487') },
    ]);
    productsRepository.useValue.findOneBy.mockReturnValue(mockedProduct);

    // Actions
    const actual = await service.getAllLoadedOffers();

    // Assertions
    expect(actual).toEqual([
      {
        _id: new ObjectId('679271f302e8562ae6ce2487'),
        products: [mockedProduct],
        title: mockedOffer.title,
      },
    ]);
  });

  it('should get loaded offer', async () => {
    // Set
    const data = {
      title: 'optimist',
      products: ['679271f302e8562ae6ce2484'],
    } as CreateOfferDto;

    // Expectations
    offersRepository.useValue.findOneBy.mockReturnValue({
      ...mockedOffer,
      _id: new ObjectId('679271f302e8562ae6ce2487'),
    });
    productsRepository.useValue.findOneBy.mockReturnValue(mockedProduct);

    // Actions
    const actual = await service.getLoadedOffer('679271f302e8562ae6ce2487');

    // Assertions
    expect(actual).toEqual({
      _id: new ObjectId('679271f302e8562ae6ce2487'),
      products: [mockedProduct],
      title: mockedOffer.title,
    });
  });

  it('should get offer', async () => {
    // Set
    const expectedOffer = {
      ...mockedOffer,
      _id: new ObjectId('679271f302e8562ae6ce2484'),
    };

    // Expectations
    offersRepository.useValue.findOneBy.mockReturnValue(expectedOffer);

    // Actions
    const actual = await service.findOneBy('679271f302e8562ae6ce2487');

    // Assertions
    expect(actual).toEqual(expectedOffer);
  });

  it('should delete a offer', async () => {
    // Expectations
    offersRepository.useValue.delete.mockReturnValue({ affected: 1 });

    // Actions
    const actual = await service.delete('679271f302e8562ae6ce2487');

    // Assertions
    expect(offersRepository.useValue.delete).toBeCalledWith(
      '679271f302e8562ae6ce2487',
    );
    expect(actual).toBeTruthy();
  });

  it('should update a offer', async () => {
    // Set
    const data = {
      title: 'optimist',
      products: ['679271f302e8562ae6ce2484'],
    } as CreateOfferDto;

    // Expectations
    offersRepository.useValue.save.mockReturnValue({ ...mockedOffer, ...data });

    // Actions
    const actual = await service.update(mockedOffer, data);

    // Assertions
    expect(offersRepository.useValue.save).toBeCalledWith({
      products: ['679271f302e8562ae6ce2484'],
      title: 'optimist',
    });
    expect(actual).toEqual({
      products: ['679271f302e8562ae6ce2484'],
      title: 'optimist',
    });
  });
});
