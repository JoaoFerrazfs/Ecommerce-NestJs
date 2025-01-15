import { Injectable, BadRequestException } from '@nestjs/common';
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class HasFile implements PipeTransform {
  transform(file: any, metadata: ArgumentMetadata) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }
    return file;
  }
}
