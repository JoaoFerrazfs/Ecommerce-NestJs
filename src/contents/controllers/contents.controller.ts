import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContentsService } from '../services/contents.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {
  }

  @Get(['']) async contents(@Res() res: Response) {
    const content = await this.contentsService.where({ name: 'Home' });
    return res.render(this.contentsService.getVewPath('home'), { banners: content[0].banners });
  }
}
