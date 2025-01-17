import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageHelper {
  public constructor(private readonly configService: ConfigService) {}

  public buildImageURL(fileName: string): string {
    const protocol = this.configService.get('PROTOCOL', 'http');
    const host = this.configService.get('HOST', 'localhost');
    const port = this.configService.get('PORT', '3000');

    return `${protocol}://${host}:${port}/public/uploads/files/${fileName}`;
  }
}
