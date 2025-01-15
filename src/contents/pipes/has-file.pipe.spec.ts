import { Test, TestingModule } from '@nestjs/testing';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { HasFile } from './has-file.pipe';

describe('Has File Pipe', () => {
  let pipe: HasFile;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HasFile],
    }).compile();

    pipe = module.get(HasFile);
  });

  it('should validate if has file', async () => {
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

    // Actions & Assertions
    expect(() => pipe.transform(file, metadata)).toThrow(BadRequestException);
    expect(() => pipe.transform(file, metadata)).toThrow(
      'Nenhum arquivo enviado.',
    );
  });
});
