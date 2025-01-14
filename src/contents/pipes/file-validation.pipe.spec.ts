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
    const actual = await pipe.transform(file, metadata);

    // Assertions
    expect(actual).toEqual(file);
  });

  it('should invalidate request without file', async () => {
    // Set
    const file = undefined;
    const metadata = {} as ArgumentMetadata;

    try {
      // Actions
      await pipe.transform(file, metadata);
    } catch (error) {
      // Assertions
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Nenhum arquivo enviado.');
    }
  });

  it('should validate a file and return Exception', async () => {
    // Set
    const file = { mimetype: 'image/webp' } as Express.Multer.File;
    const metadata = {} as ArgumentMetadata;

    try {
      // Actions
      await pipe.transform(file, metadata);
    } catch (error) {
      // Assertions
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('O arquivo precisa ser um JPG, JPEG ou PNG.');
    }
  });
});
