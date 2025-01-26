import { ModulesService } from './services/modules.service';
import { ModulesController } from './controllers/api/modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleEntity } from './entities/module.entity';
import { Module } from '@nestjs/common';
import { Offer } from '../offers/entities/offer.entity';
import { Banner } from '../contents/entities/banner.entity';
import { ModuleBuilderService } from './services/module-builder.service';
import { ContentsModule } from '../contents/contents.module';
import { OffersModule } from '../offers/offers.module';

@Module({
  controllers: [ModulesController],
  providers: [ModulesService, ModuleBuilderService],
  imports: [
    TypeOrmModule.forFeature([ModuleEntity, Banner, Offer]),
    ContentsModule,
    OffersModule,
  ],
})
export class ModulesModule {}
