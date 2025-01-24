import { Module } from '@nestjs/common';
import { OffersService } from './services/offers.service';
import { OffersController } from './controllers/api/offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpersModule } from '../helpers/helpers.module';
import { Offer } from './entities/offer.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
  imports: [TypeOrmModule.forFeature([Offer, Product]), HelpersModule],
})
export class OffersModule {}
