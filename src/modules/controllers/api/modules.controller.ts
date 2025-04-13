import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  NotFoundException,
  BadRequestException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ModulesService } from '../../services/modules.service';
import { CreateModulesDto } from '../../dto/create-module.dto';
import { UpdateModuleDto } from '../../dto/update-module.dto';
import { IdValidationPipe } from '../../../custom-decorators/pipes/id-validation.pipe';
import { ModuleEntity } from '../../entities/module.entity';
import { ValidateStoredIdPipe } from '../../pipes/validate-stored-id.pipe';
import { CreateModule, DeleteModule, FindAllModule, FindOneModule, UpdateModule } from '../../oas/module.oas';

@Controller('api/modules')
export class ModulesController {
  public constructor(private readonly modulesService: ModulesService) {}

  @CreateModule()
  @UsePipes(ValidateStoredIdPipe)
  @Post()
  public async create(
    @Body() createModuleDto: CreateModulesDto,
  ): Promise<{ data: ModuleEntity }> {
    return { data: await this.modulesService.create(createModuleDto) };
  }

  @UpdateModule()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(ValidateStoredIdPipe)
  @Patch('/:id')
  public async update(
    @Body() updateModuleDto: UpdateModuleDto,
    @Param('id', IdValidationPipe) id: string,
  ) {
    const module = await this.modulesService.findOne(id);
    if (!module) throw new NotFoundException(`O Modulo ${id} não encontrado`);

    if (!(await this.modulesService.update(id, updateModuleDto))) {
      throw new BadRequestException(`O Modulo ${id} não pode ser atualizado`);
    }

    return;
  }

  @FindAllModule()
  @Get()
  public async findAll(): Promise<{ data: ModuleEntity[] }> {
    return { data: await this.modulesService.findAll() };
  }

  @Get('/loadedModules')
  public async findAllLoaded() {
    return { data: await this.modulesService.findAllLoaded() };
  }

  @FindOneModule()
  @Get(':id')
  public async findOne(
    @Param('id', IdValidationPipe) id: string,
  ): Promise<{ data: ModuleEntity }> {
    const module = await this.modulesService.findOne(id);
    if (!module) throw new NotFoundException();

    return { data: module };
  }

  @DeleteModule()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(
    @Param('id', IdValidationPipe) id: string,
  ): Promise<void> {
    if (await this.modulesService.delete(id)) return;

    throw new NotFoundException(`O Modulo ${id} não pode ser apagado`);
  }
}
