import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return request.headers.accept?.includes('application/json') ||
      request.url.includes('/api/')
      ? response.status(404).json(exception.getResponse())
      : response.status(404).render(NOT_FOUND_VIEW_PATH);
  }
}

export const NOT_FOUND_VIEW_PATH = 'views/global/notFound';
