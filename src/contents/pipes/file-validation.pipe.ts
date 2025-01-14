import { Injectable, BadRequestException } from '@nestjs/common';
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

  transform(file: any, metadata: ArgumentMetadata) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }

    const isValidMime = this.ALLOWED_MIME_TYPES.some((mime) => {
      return file.mimetype === mime;
    });

    if (!isValidMime) {
      throw new BadRequestException(
        'O arquivo precisa ser um JPG, JPEG ou PNG.',
      );
    }

    return file;
  }
}
