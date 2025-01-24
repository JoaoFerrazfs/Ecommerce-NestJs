import { Test, TestingModule } from '@nestjs/testing';
import { OffersController } from './offers.controller';
import { CreateOfferDto } from '../../dto/create-offer.dto';
import { productsRepository } from '../../../../test/mocks/repositores/mock.ProductsRepository';
import { offersRepository } from '../../../../test/mocks/repositores/mock.OffersRepository';
import { offerService } from '../../../../test/mocks/services/mock.OfferstService';
import { mockedOffer } from '../../../../test/mocks/entities/mock.offer.entity';
import { NotFoundException } from '@nestjs/common';

describe('OffersController', () => {
  let controller: OffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [offerService, productsRepository, offersRepository],
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
    offerService.useValue.create.mockResolvedValue(mockedOffer);

    // Actions
    const actual = await controller.create(data);

    // Assertions
    expect(actual).toBe(mockedOffer);
    expect(offerService.useValue.create).toBeCalledWith(data);
  });

  it('should get all offers', async () => {
    // Expectations
    offerService.useValue.getAllLoadedOffers.mockResolvedValue([mockedOffer]);

    // Actions
    const actual = await controller.list();

    // Assertions
    expect(actual).toEqual({ data: [mockedOffer] });
    expect(offerService.useValue.getAllLoadedOffers).toBeCalledWith();
  });

  it('should get an offer', async () => {
    // Set
    const id = '679271f302e8562ae6ce2484';

    // Expectations
    offerService.useValue.getLoadedOffer.mockResolvedValue(mockedOffer);

    // Actions
    const actual = await controller.get(id);

    // Assertions
    expect(actual).toEqual({ data: mockedOffer });
    expect(offerService.useValue.getLoadedOffer).toBeCalledWith(id);
  });

  it('should get an offer', async () => {
    // Set
    const id = '679271f302e8562ae6ce2484';

    // Expectations
    offerService.useValue.getLoadedOffer.mockResolvedValue(mockedOffer);

    // Actions
    const actual = await controller.get(id);

    // Assertions
    expect(actual).toEqual({ data: mockedOffer });
    expect(offerService.useValue.getLoadedOffer).toBeCalledWith(id);
  });

  it('should delete an offer', async () => {
    // Set
    const id = '679271f302e8562ae6ce2484';

    // Expectations
    offerService.useValue.delete.mockResolvedValue(true);

    // Actions
    await controller.delete(id);

    // Assertions
    expect(offerService.useValue.delete).toBeCalledWith(id);
  });

  it('should not delete an offer', async () => {
    // Set
    const id = '679271f302e8562ae6ce2484';

    // Expectations
    offerService.useValue.delete.mockResolvedValue(false);

    // Actions
    const actual = controller.delete(id);

    // Assertions
    await expect(actual).rejects.toThrow(NotFoundException);
    expect(offerService.useValue.delete).toBeCalledWith(id);
  });

  it('should update an offer', async () => {
    // Set
    const id = '679271f302e8562ae6ce2484';
    const data = {} as CreateOfferDto;

    // Expectations
    offerService.useValue.findOneBy.mockResolvedValue(mockedOffer);
    offerService.useValue.update.mockResolvedValue(mockedOffer);

    // Actions
    const actual = await controller.update(data, id);

    // Assertions
    expect(actual).toEqual(mockedOffer);
    expect(offerService.useValue.update).toHaveBeenCalledWith(
      mockedOffer,
      data,
    );
  });

  it('should not update an offer', async () => {
    // Set
    const id = '679271f302e8562ae6ce2484';
    const data = {} as CreateOfferDto;

    // Expectations
    offerService.useValue.findOneBy.mockResolvedValue(null);
    offerService.useValue.update.mockResolvedValue(null);

    // Actions
    const actual = controller.update(data, id);

    // Assertions
    await expect(actual).rejects.toThrow(NotFoundException);
    expect(offerService.useValue.update).not.toHaveBeenCalled();
  });
});
