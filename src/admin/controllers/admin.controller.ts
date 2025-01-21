import { Controller, Get, Param, Res } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('')
  index(@Res() res: Response) {
    return res.render(this.adminService.getVewPath('home'), {
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
    return res.render(this.adminService.getVewPath('contentsForm'), {
      layout: 'admin',
    });
  }

  @Get('/contents/edit/:id') async edit(
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    return res.render(this.adminService.getVewPath('contentsForm'), {
      layout: 'admin',
      id,
    });
  }

  @Get('/banners/create') async banner(@Res() res: Response) {
    return res.render(this.adminService.getVewPath('bannerForm'), {
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
    return res.render(this.adminService.getVewPath('bannerForm'), {
      layout: 'admin',
      id,
    });
  }

  @Get('products')
  products(@Res() res: Response) {
    return res.render(this.adminService.getVewPath('listProducts'), {
      layout: 'admin',
    });
  }

  @Get('products/create')
  createProduct(@Res() res: Response) {
    return res.render(this.adminService.getVewPath('productForm'), {
      layout: 'admin',
    });
  }

  @Get('products/edit/:id')
  editProduct(@Res() res: Response, @Param('id') id: string) {
    return res.render(this.adminService.getVewPath('productForm'), {
      layout: 'admin',
      id,
    });
  }

  @Get('products/edit/:id/images')
  editProductImages(@Res() res: Response, @Param('id') id: string) {
    return res.render(this.adminService.getVewPath('listProductImages'), {
      layout: 'admin',
      id,
    });
  }
}
