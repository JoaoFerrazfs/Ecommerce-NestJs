import { Module } from '@nestjs/common';
import { ContentsController } from './controllers/contents.controller';
import { ContentsService } from './services/contents.service';
import { AdminContentsController } from './controllers/admin-contents.controller';

@Module({
  controllers: [ContentsController, AdminContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
