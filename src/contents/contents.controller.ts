import { Controller, Get, Res } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { Response } from 'express';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  index(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath(), {
      message: 'Hello world!',
    });
  }
}
