import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContentsService } from '../services/contents.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get(['', 'modular/:name']) async contents(
    @Res() res: Response,
  ): Promise<void> {
    return res.render(this.contentsService.getVewPath('modular_pages'));
  }
}
