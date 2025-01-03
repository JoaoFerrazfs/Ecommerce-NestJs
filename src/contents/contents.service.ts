import { Injectable } from '@nestjs/common';
import { RenderContract } from '../contracts/services/render-contract';

@Injectable()
export class ContentsService implements RenderContract {
  PATH_VIEWS = 'contents/views';

  getVewPath() {
    return this.PATH_VIEWS;
  }
}
