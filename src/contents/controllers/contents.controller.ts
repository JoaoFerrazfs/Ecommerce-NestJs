import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContentsService } from '../services/contents.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { NOT_FOUND_VIEW_PATH } from '../../filters/not-found-exception.filter';

@ApiExcludeController()
@Controller()
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get(['', 'modular/content/:name']) async contents(
    @Res() res: Response,
  ): Promise<void> {
    return res.render(this.contentsService.getVewPath('modular_pages'));
  }
}
