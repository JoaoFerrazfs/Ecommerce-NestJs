import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OffersService } from '../../services/offers.service';
import { CreateOfferDto } from '../../dto/create-offer.dto';
import { LoadedOffer, Offer } from '../../entities/offer.entity';
import { IdValidationPipe } from '../../../custom-decorators/pipes/id-validation.pipe';

@Controller('api/offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  public async create(@Body() data: CreateOfferDto) {
    return await this.offersService.create(data);
  }

  @Get()
  public async list(): Promise<{ data: LoadedOffer[] }> {
    return { data: await this.offersService.getAllLoadedOffers() };
  }

  @Get('/:id')
  public async get(
    @Param('id', IdValidationPipe) id: string,
  ): Promise<{ data: LoadedOffer }> {
    return { data: await this.offersService.getLoadedOffer(id) };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string): Promise<{ data: boolean }> {
    const result = await this.offersService.delete(id);

    if (!result) throw new NotFoundException();

    return;
  }

  @Patch('/:id')
  public async update(
    @Body() data: CreateOfferDto,
    @Param('id', IdValidationPipe) id: string,
  ): Promise<Offer> {
    const offer = await this.offersService.findOneBy(id);
    if (!offer) throw new NotFoundException();

    return await this.offersService.update(offer, data);
  }
}
