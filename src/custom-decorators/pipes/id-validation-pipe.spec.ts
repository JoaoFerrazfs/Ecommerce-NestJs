import { IdValidationPipe } from './id-validation.pipe';
import { ArgumentMetadata, UnprocessableEntityException } from '@nestjs/common';

describe('PipeTransform', () => {
  it('should validate id and return the id itself', () => {
    // Set
    const id = '679271f302e8562ae6ce2484';
    const idValidationPipe = new IdValidationPipe();
    const metadata = {} as ArgumentMetadata;

    // Actions
    const actual = idValidationPipe.transform(id, metadata);

    // Assertions
    expect(actual).toEqual(id);
  });

  it('should validate id and throw an exception', () => {
    // Set
    const id = '1';
    const idValidationPipe = new IdValidationPipe();
    const metadata = {} as ArgumentMetadata;

    // Actions and Assertions
    expect(() => idValidationPipe.transform(id, metadata)).toThrow(
      UnprocessableEntityException,
    );
  });
});
