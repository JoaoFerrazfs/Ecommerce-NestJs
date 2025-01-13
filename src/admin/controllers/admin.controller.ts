import { Controller, Get, Param, Res } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get(['', 'contents'])
  index(@Res() res: Response) {
    return res.render(this.adminService.getVewPath('listContents'), {
      layout: 'admin',
    });
  }

  @Get('/contents/create')
  content(@Res() res: Response) {
    return res.render(this.adminService.getVewPath('adminContentsCreate'), {
      layout: 'admin',
      isEdit: false,
    });
  }

  @Get('/contents/edit/:id') async edit(@Res() res: Response, @Param('id') id: string) {
    return res.render(this.adminService.getVewPath('adminContentsCreate'), {
      layout: 'admin',
      isEdit: true,
      id,
    });
  }

  @Get('/banners/create') async banner(@Res() res: Response) {
    return res.render(this.adminService.getVewPath('adminBannerCreate'), {
      layout: 'admin',
    });
  }

  @Get('/banners') async banners(@Res() res: Response) {
    return res.render(this.adminService.getVewPath('listBanners'), {
      layout: 'admin',
    });
  }

  @Get('/banners/edit/:id') async editBanner(@Res() res: Response, @Param('id') id: string) {
    return res.render(this.adminService.getVewPath('adminBannerCreate'), {
      layout: 'admin',
      id,
    });
  }

}
