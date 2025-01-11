import {
  Body,
  Controller,
  Delete,
  Get, HttpCode, NotFoundException,
  Param, Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { ContentsService } from '../../services/contents.service';
import { CreateBannerDto } from '../../dto/create-banner.dto';
import { FileValidationPipe } from '../../pipes/file-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { BannersService } from '../../services/banners.service';
import { UpdateBannerDto } from '../../dto/update-banner.dto';
import multerConfig from '../../../files/multer-config';

@Controller('admin/banners')
export class AdminBannerController {
  constructor(
    private readonly bannersService: BannersService,
    private readonly contentsService: ContentsService,
  ) {
  }

  @Get('/') async index(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('listBanners'), {
      layout: 'admin',
      banners: await this.bannersService.list(),
    });
  }

  @Get('/create') async banner(@Res() res: Response) {
    return res.render(this.contentsService.getVewPath('adminBannerCreate'), {
      layout: 'admin',
    });
  }

  @Get('/edit/:id') async editBanner(@Res() res: Response, @Param('id') id: string) {
    const banner = await this.bannersService.findById(id);
    return res.render(this.contentsService.getVewPath('adminBannerCreate'), {
      layout: 'admin',
      banner,
      id,
    });
  }

  @UseInterceptors(FileInterceptor('image', multerConfig))
  @HttpCode(204)
  @Patch('/:id') async edit(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() { title }: UpdateBannerDto,
  ) {

    let payload: { title: string, filename?: string } = { title };
    if (file?.filename) payload.filename = file.filename;

    await this.bannersService.update(id, payload);

    return;
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @UsePipes(FileValidationPipe)
  async store(
    @UploadedFile() file: Express.Multer.File,
    @Body() { title }: CreateBannerDto,
  ) {
    const banner = await this.bannersService.saveBanner(file.filename, title);

    return { data: banner };
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {

    if (!await this.bannersService.deleteBanner(id)) {
      throw new NotFoundException('Aconteceu algum erro');
    }
    return { data: await this.bannersService.deleteBanner(id) };
  }

  @Get('list')
  async listBanners() {
    return { data: await this.bannersService.list() };
  }
}
