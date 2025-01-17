import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateBannerDto } from '../../dto/create-banner.dto';
import { FileValidationPipe } from '../../pipes/file-validation.pipe';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BannersService } from '../../services/banners.service';
import { UpdateBannerDto } from '../../dto/update-banner.dto';
import multerConfig from '../../../files/multer-config';
import {
  CreateBanner,
  DeleteBanner,
  FindBanner,
  ListBanners,
  UpdateBanner,
} from '../../oas/banner.oas';
import { Banner } from '../../entities/banner.entity';
import { HasFile } from '../../pipes/has-file.pipe';

@Controller(['api/banners'])
export class BannerController {
  constructor(private readonly bannersService: BannersService) {}

  @UpdateBanner()
  @UseInterceptors(FilesInterceptor('image', 10, multerConfig))
  @HttpCode(204)
  @Patch('/:id')
  async edit(
    @Param('id') id: string,
    @UploadedFiles(FileValidationPipe) files: Array<Express.Multer.File>,
    @Body() { title }: UpdateBannerDto,
  ): Promise<void> {
    let payload: { title: string; filename?: string } = { title };
    if (files[0]?.filename) payload.filename = files[0].filename;

    await this.bannersService.update(id, payload);
    return;
  }

  @FindBanner()
  @Get('/find/:id')
  async findById(@Param('id') id: string): Promise<{ data: Banner }> {
    const banner = await this.bannersService.findById(id);

    if (!banner) throw new NotFoundException();

    return { data: banner };
  }

  @CreateBanner()
  @Post('/create')
  @UseInterceptors(FilesInterceptor('image', 10, multerConfig))
  async store(
    @UploadedFiles(HasFile, FileValidationPipe)
    files: Array<Express.Multer.File>,
    @Body() { title }: CreateBannerDto,
  ): Promise<{ data: Banner }> {
    return {
      data: await this.bannersService.saveBanner(files[0].filename, title),
    };
  }

  @DeleteBanner()
  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const deleteProcessResult = await this.bannersService.deleteBanner(id);

    if (!deleteProcessResult)
      throw new BadRequestException('Não foi possivel realizar a deleção');

    return;
  }

  @ListBanners()
  @Get('/list')
  async listBanners(): Promise<{ data: Banner[] }> {
    return { data: await this.bannersService.list() };
  }
}
