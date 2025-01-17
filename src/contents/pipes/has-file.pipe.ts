import { Injectable, BadRequestException } from '@nestjs/common';
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class HasFile implements PipeTransform {
  transform(files: any, metadata: ArgumentMetadata) {
    if (!files) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }
    return files;
  }
}
