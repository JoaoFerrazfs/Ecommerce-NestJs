import {
  Body,
  Controller,
  Delete,
  Get, HttpCode, NotFoundException,
  Param, Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateBannerDto } from '../../dto/create-banner.dto';
import { FileValidationPipe } from '../../pipes/file-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { BannersService } from '../../services/banners.service';
import { UpdateBannerDto } from '../../dto/update-banner.dto';
import multerConfig from '../../../files/multer-config';

@Controller(['api/banners'])
export class BannerController {
  constructor(
    private readonly bannersService: BannersService,
  ) {
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

  @Get('/find/:id')
  async findById(@Param('id') id: string) {
    return { data: await this.bannersService.findById(id) };
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @UsePipes(FileValidationPipe)
  async store(
    @UploadedFile() file: Express.Multer.File,
    @Body() { title }: CreateBannerDto,
  ) {

    return { data: await this.bannersService.saveBanner(file.filename, title) };
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {

    if (!await this.bannersService.deleteBanner(id)) {
      throw new NotFoundException('Aconteceu algum erro');
    }
    return { data: await this.bannersService.deleteBanner(id) };
  }

  @Get('/list')
  async listBanners() {
    return { data: await this.bannersService.list() };
  }
}
