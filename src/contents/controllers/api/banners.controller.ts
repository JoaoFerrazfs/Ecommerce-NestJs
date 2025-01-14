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
import {
  CreateContent,
  DeleteContent,
  FindContent,
  ListContents,
  UpdateContent,
} from '../../oas/content.oas';
import { Banner } from '../../entities/banner.entity';

@Controller(['api/banners'])
export class BannerController {
  constructor(private readonly bannersService: BannersService) {}

  @UpdateContent()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @HttpCode(204)
  @Patch('/:id')
  async edit(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() { title }: UpdateBannerDto,
  ): Promise<void> {
    let payload: { title: string; filename?: string } = { title };
    if (file?.filename) payload.filename = file.filename;

    await this.bannersService.update(id, payload);
    return;
  }

  @FindContent()
  @Get('/find/:id')
  async findById(@Param('id') id: string): Promise<{ data: Banner }> {
    const banner = await this.bannersService.findById(id);

    if (!banner) throw new NotFoundException();

    return { data: banner };
  }

  @CreateContent()
  @Post('/create')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @UsePipes(FileValidationPipe)
  async store(
    @UploadedFile() file: Express.Multer.File,
    @Body() { title }: CreateBannerDto,
  ): Promise<{ data: Banner }> {
    return { data: await this.bannersService.saveBanner(file.filename, title) };
  }

  @DeleteContent()
  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const deleteProcessResult = await this.bannersService.deleteBanner(id);

    if (!deleteProcessResult)
      throw new BadRequestException('Não foi possivel realizar a deleção');

    return;
  }

  @ListContents()
  @Get('/list')
  async listBanners(): Promise<{ data: Banner[] }> {
    return { data: await this.bannersService.list() };
  }
}
