import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContentsService } from '../services/contents.service';

@Controller()
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get('contents')
  contents(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('home'));
  }

  @Get()
  index(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('home'));
  }
}
