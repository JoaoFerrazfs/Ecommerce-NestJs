import { Injectable } from '@nestjs/common';
import { RenderContract } from '../../contracts/services/render-contract';

@Injectable()
export class AdminService implements RenderContract {
  PATH_VIEWS = 'contents/views/';

  public getVewPath(fileName: string) {
    return this.PATH_VIEWS + fileName;
  }
}
