import { Controller, Get, Param, Res } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('')
  index(@Res() res: Response) {
    return res.render(this.adminService.getVewPath('adminHome'), {
      layout: 'admin',
    });
  }

  @Get('contents')
  contents(@Res() res: Response) {
    return res.render(this.adminService.getVewPath('listContents'), {
      layout: 'admin',
    });
  }

  @Get('/contents/create')
  content(@Res() res: Response) {
    return res.render(this.adminService.getVewPath('adminContentsForm'), {
      layout: 'admin',
    });
  }

  @Get('/contents/edit/:id') async edit(
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    return res.render(this.adminService.getVewPath('adminContentsForm'), {
      layout: 'admin',
      id,
    });
  }

  @Get('/banners/create') async banner(@Res() res: Response) {
    return res.render(this.adminService.getVewPath('adminBannerForm'), {
      layout: 'admin',
    });
  }

  @Get('/banners') async banners(@Res() res: Response) {
    return res.render(this.adminService.getVewPath('listBanners'), {
      layout: 'admin',
    });
  }

  @Get('/banners/edit/:id') async editBanner(
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    return res.render(this.adminService.getVewPath('adminBannerForm'), {
      layout: 'admin',
      id,
    });
  }
}
