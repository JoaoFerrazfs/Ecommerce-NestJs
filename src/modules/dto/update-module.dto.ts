import { PartialType } from '@nestjs/swagger';
import { CreateModulesDto } from './create-module.dto';

export class UpdateModuleDto extends PartialType(CreateModulesDto) {}
