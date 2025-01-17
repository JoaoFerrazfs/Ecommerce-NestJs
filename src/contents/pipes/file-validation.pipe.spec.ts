import { Test, TestingModule } from '@nestjs/testing';
import { FileValidationPipe } from './file-validation.pipe';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';

describe('File Validation Pipe', () => {
  let pipe: FileValidationPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileValidationPipe],
    }).compile();

    pipe = module.get(FileValidationPipe);
  });

  it('should validate a file', async () => {
    // Set
    const file = { mimetype: 'image/jpg' } as Express.Multer.File;
    const metadata = {} as ArgumentMetadata;

    // Actions
    const actual = await pipe.transform([file], metadata);

    // Assertions
    expect(actual).toEqual([file]);
  });

  it('should invalidate request without file', async () => {
    // Set
    const file = undefined;
    const metadata = {} as ArgumentMetadata;

    // Actions
    const actual = pipe.transform([file], metadata);

    // Assertions
    expect(actual).toBeUndefined();
  });

  it('should throw a BadRequestException for an invalid file type', async () => {
    // Arrange
    const file = { mimetype: 'image/non-existent' } as Express.Multer.File;
    const metadata = {} as ArgumentMetadata;

    // Actions & Assertions
    expect(() => pipe.transform([file], metadata)).toThrow(BadRequestException);
    expect(() => pipe.transform([file], metadata)).toThrow(
      'O arquivo precisa ser um WEBP, JPG, JPEG ou PNG.',
    );
  });
});
