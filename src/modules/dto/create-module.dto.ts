import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, Length, ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';
import { AllowedModuleType } from '../enums/modules-type.enum';
import { transformeID } from '../../custom-decorators/transformers/id.tranformer';

export class CreateModuleDto {
  @IsNotEmpty()
  @IsEnum(AllowedModuleType)
  type: AllowedModuleType;

  @IsNotEmpty()
  @Transform(({ value }) => transformeID(value))
  _id: ObjectId;
}

export class CreateModulesDto {

  @Length(3)
  @IsNotEmpty()
  name: string

  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => CreateModuleDto)
  modules: CreateModuleDto[];
}
