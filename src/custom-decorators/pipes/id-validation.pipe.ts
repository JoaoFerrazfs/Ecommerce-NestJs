import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('oi');
    if (typeof value == 'string' && value.length === 24) return value;
    throw new UnprocessableEntityException({
      errors: [
        {
          message: `O id deve ser uma string de 24 caracteres`,
          value,
        },
      ],
    });
  }
}
