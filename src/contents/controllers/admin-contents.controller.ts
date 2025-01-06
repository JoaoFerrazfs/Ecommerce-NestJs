import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ContentsService } from '../services/contents.service';

@Controller('admin/contents')
export class AdminContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  content(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('adminContents'), {
      layout: 'admin',
    });
  }

  @Get('/banner')
  banner(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('adminContentsBanner'), {
      layout: 'admin',
    });
  }
}
