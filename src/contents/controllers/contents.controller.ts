import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContentsService } from '../services/contents.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { NOT_FOUND_VIEW_PATH } from '../../filters/not-found-exception.filter';

@ApiExcludeController()
@Controller()
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get(['']) async contents(@Res() res: Response): Promise<void> {
    const content = await this.contentsService.findOne({ name: 'Home' });

    return res.render(this.contentsService.getVewPath('home'), {
      banners: content.banners,
      modules: content.modules,
    });
  }

  @Get(['modular/content/:name']) async modular(
    @Param('name') name: string,
    @Res() res: Response,
  ) {
    const content = await this.contentsService.findOne({ name });
    if (!content) return res.render(NOT_FOUND_VIEW_PATH);

    return res.render(this.contentsService.getVewPath('home'), {
      banners: content.banners,
    });
  }
}
