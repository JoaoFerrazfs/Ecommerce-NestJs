import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContentsService } from '../services/contents.service';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  index(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('home'), {
      message: 'Hello world!',
    });
  }
}
