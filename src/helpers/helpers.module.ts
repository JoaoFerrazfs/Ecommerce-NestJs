import { Module } from '@nestjs/common';
import { ImageHelper } from './image.helper';

@Module({
  providers: [ImageHelper],
  exports: [ImageHelper],
})
export class HelpersModule {}
