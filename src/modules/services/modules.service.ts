import { Injectable } from '@nestjs/common';
import { CreateModulesDto } from '../dto/create-module.dto';
import { UpdateModuleDto } from '../dto/update-module.dto';
import { ModuleEntity } from '../entities/module.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { ModuleBuilderService } from './module-builder.service';
import { LoadedModulesType } from '../types/loaded-modules.type';

@Injectable()
export class ModulesService {
  public constructor(
    @InjectRepository(ModuleEntity)
    private readonly modulesRepository: Repository<ModuleEntity>,
    private readonly moduleBuilderService: ModuleBuilderService,
  ) {}

  public async create(data: CreateModulesDto): Promise<ModuleEntity> {
    const modules = await this.modulesRepository.create({
      modulesGroup: data.modules,
      name: data.name,
    });

    return await this.modulesRepository.save(modules);
  }

  public async update(
    id: string,
    updateModuleDto: UpdateModuleDto,
  ): Promise<boolean> {
    const result = await this.modulesRepository.update(new ObjectId(id), {
      modulesGroup: updateModuleDto.modules,
    });
    return !!result.affected;
  }

  public async findAll(): Promise<ModuleEntity[]> {
    return await this.modulesRepository.find();
  }

  public async findAllLoaded(): Promise<LoadedModulesType[]> {
    const modules = await this.modulesRepository.find();

    return await this.moduleBuilderService.loadModules(modules);
  }

  public async findOne(id: string): Promise<ModuleEntity | null> {
    return await this.modulesRepository.findOneBy({ _id: new ObjectId(id) });
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.modulesRepository.delete({
      _id: new ObjectId(id),
    });
    return !!result.affected;
  }
}
