import { Test, TestingModule } from '@nestjs/testing';
import { OffersController } from './offers.controller';
import { CreateOfferDto } from '../../dto/create-offer.dto';
import { productsRepository } from '../../../../test/mocks/repositores/mock.ProductsRepository';
import { offersRepository } from '../../../../test/mocks/repositores/mock.OffersRepository';
import { mockedOfferService } from '../../../../test/mocks/services/mock.offers-service';
import { mockedOffer } from '../../../../test/mocks/entities/mock.offer.entity';
import { NotFoundException } from '@nestjs/common';

describe('OffersController', () => {
  let controller: OffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [mockedOfferService, productsRepository, offersRepository],
    }).compile();

    controller = module.get(OffersController);

    jest.resetAllMocks();
  });

  it('should create an offer', async () => {
    // Set
    const data = {
      title: 'title',
      description: 'description',
      products: ['679271f302e8562ae6ce2484'],
    } as CreateOfferDto;

    // Expectations
    mockedOfferService.useValue.create.mockResolvedValue(mockedOffer);

    // Actions
    const actual = await controller.create(data);

    // Assertions
    expect(actual).toBe(mockedOffer);
    expect(mockedOfferService.useValue.create).toBeCalledWith(data);
  });

  it('should get all offers', async () => {
    // Expectations
    mockedOfferService.useValue.getAllLoadedOffers.mockResolvedValue([
      mockedOffer,
    ]);

    // Actions
    const actual = await controller.list();

    // Assertions
    expect(actual).toEqual({ data: [mockedOffer] });
    expect(mockedOfferService.useValue.getAllLoadedOffers).toBeCalledWith();
  });

  it('should get an offer', async () => {
    // Set
    const id = '679271f302e8562ae6ce2484';

    // Expectations
    mockedOfferService.useValue.getLoadedOffer.mockResolvedValue(mockedOffer);

    // Actions
    const actual = await controller.get(id);

    // Assertions
    expect(actual).toEqual({ data: mockedOffer });
    expect(mockedOfferService.useValue.getLoadedOffer).toBeCalledWith(id);
  });

  it('should get an offer', async () => {
    // Set
    const id = '679271f302e8562ae6ce2484';

    // Expectations
    mockedOfferService.useValue.getLoadedOffer.mockResolvedValue(mockedOffer);

    // Actions
    const actual = await controller.get(id);

    // Assertions
    expect(actual).toEqual({ data: mockedOffer });
    expect(mockedOfferService.useValue.getLoadedOffer).toBeCalledWith(id);
  });

  it('should delete an offer', async () => {
    // Set
    const id = '679271f302e8562ae6ce2484';

    // Expectations
    mockedOfferService.useValue.delete.mockResolvedValue(true);

    // Actions
    await controller.delete(id);

    // Assertions
    expect(mockedOfferService.useValue.delete).toBeCalledWith(id);
  });

  it('should not delete an offer', async () => {
    // Set
    const id = '679271f302e8562ae6ce2484';

    // Expectations
    mockedOfferService.useValue.delete.mockResolvedValue(false);

    // Actions
    const actual = controller.delete(id);

    // Assertions
    await expect(actual).rejects.toThrow(NotFoundException);
    expect(mockedOfferService.useValue.delete).toBeCalledWith(id);
  });

  it('should update an offer', async () => {
    // Set
    const id = '679271f302e8562ae6ce2484';
    const data = {} as CreateOfferDto;

    // Expectations
    mockedOfferService.useValue.findOneBy.mockResolvedValue(mockedOffer);
    mockedOfferService.useValue.update.mockResolvedValue(mockedOffer);

    // Actions
    const actual = await controller.update(data, id);

    // Assertions
    expect(actual).toEqual(mockedOffer);
    expect(mockedOfferService.useValue.update).toHaveBeenCalledWith(
      mockedOffer,
      data,
    );
  });

  it('should not update an offer', async () => {
    // Set
    const id = '679271f302e8562ae6ce2484';
    const data = {} as CreateOfferDto;

    // Expectations
    mockedOfferService.useValue.findOneBy.mockResolvedValue(null);
    mockedOfferService.useValue.update.mockResolvedValue(null);

    // Actions
    const actual = controller.update(data, id);

    // Assertions
    await expect(actual).rejects.toThrow(NotFoundException);
    expect(mockedOfferService.useValue.update).not.toHaveBeenCalled();
  });
});
