import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateModulesDto } from '../dto/create-module.dto';
import { BannersService } from '../../contents/services/banners.service';
import { OffersService } from '../../offers/services/offers.service';

@Injectable()
export class ValidateStoredIdPipe implements PipeTransform {
  constructor(
    private readonly bannerService: BannersService,
    private readonly offerService: OffersService,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!(value instanceof CreateModulesDto)) return value;

    const modules = value.modules.map((module) => {
      return module._id;
    });

    for (let id of modules) {
      const entity =
        (await this.offerService.findOneBy(id)) ??
        (await this.bannerService.findById(id));

      if (!entity) {
        throw new UnprocessableEntityException({
          errors: [
            {
              message: `O id: ${id} não estão salvo no banco de de dados`,
            },
          ],
        });
      }
    }

    return value;
  }
}
