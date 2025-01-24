import { Module } from '@nestjs/common';
import { ImageHelper } from './image.helper';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ImageHelper, ConfigService],
  exports: [ImageHelper],
})
export class HelpersModule {}
