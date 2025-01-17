import { Injectable, BadRequestException } from '@nestjs/common';
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

  transform(files: any, metadata: ArgumentMetadata) {
    if (!Array.isArray(files) || files.every((item) => !item)) return undefined;

    let isValidMime;
    files.forEach((file) => {
      isValidMime = this.ALLOWED_MIME_TYPES.some((mime) => {
        return file.mimetype === mime;
      });
    });

    if (!isValidMime) {
      throw new BadRequestException(
        'O arquivo precisa ser um WEBP, JPG, JPEG ou PNG.',
      );
    }

    return files;
  }
}
