import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContentsService } from '../services/contents.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get([''])
  contents(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('home'));
  }
}
