import { Injectable, NotFoundException } from '@nestjs/common';
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
  ): Promise<ModuleEntity | null> {

    const module = await this.modulesRepository.findOne({where: {_id: new ObjectId(id)}})
    if(!module) return null;

    module.modulesGroup = updateModuleDto.modules

    return await this.modulesRepository.save(module);
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

  public async findOneLoadedModule(id: string): Promise<LoadedModulesType[]> {
   const module  = await this.modulesRepository.findOneBy({ _id: new ObjectId(id) });

   if(!module) throw new NotFoundException();

    return await this.moduleBuilderService.loadModules([module]);
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.modulesRepository.delete({
      _id: new ObjectId(id),
    });
    return !!result.affected;
  }
}
