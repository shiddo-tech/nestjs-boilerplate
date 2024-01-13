import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IncomingMessage } from 'http';
import { ApiErrorDTO } from '../errors/domain/api-error.dto';
import { Errors } from '../errors/domain/errors.enum';
import { ApiRuntimeException } from '../errors/api-runtime-exception';
import { DebugUtil } from '../utils/debug.util';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  private logger = new Logger(HttpInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const requestUuid = DebugUtil.debugRequest(req);
    const incomingMessage: IncomingMessage = context.getArgs().filter((arg) => arg instanceof IncomingMessage)[0];

    this.logger.log(`Request to --> ${incomingMessage.method} ${incomingMessage.url}`);

    return next.handle().pipe(
      map((res) => {
        DebugUtil.debugResponse(res, requestUuid);
        return res;
      }),
      this.catchErrors(requestUuid),
    );
  }

  private catchErrors(requestUuid: string) {
    return catchError((exception): Observable<never> => {
      this.logError(exception);
      if (exception instanceof ApiRuntimeException) {
        this.DebugErrorResponse(exception, requestUuid);
        return throwError(() => exception);
      } else if (exception instanceof HttpException) {
        this.DebugErrorResponse(exception, requestUuid);
        return throwError(() => exception);
      } else if (exception?.response?.data) {
        this.logger.error(exception.response.data);
        if (typeof exception?.response?.data?.status === 'number') {
          const httpException = new HttpException(exception?.response?.data, exception?.response?.data?.status);
          this.DebugErrorResponse(exception, requestUuid);
          return throwError(() => exception);
        } else {
          const httpException = new HttpException(exception?.response?.data, exception?.response?.status);
          this.DebugErrorResponse(exception, requestUuid);
          return throwError(() => exception);
        }
      } else if (exception?.response?.message) {
        this.logger.error(exception?.response?.message);
        const status = exception?.response?.status != null ? exception?.response?.status : exception?.response?.statusCode;
        const httpException = new HttpException(exception?.response, status);
        this.DebugErrorResponse(exception, requestUuid);
        return throwError(() => exception);
      } else {
        const error = HttpInterceptor.formatError(exception);
        this.DebugErrorResponse(exception, requestUuid);
        return throwError(() => exception);
      }
    });
  }

  private DebugErrorResponse(err: HttpException, requestUuid: string) {
    DebugUtil.debugResponse(err?.getStatus(), requestUuid);
    DebugUtil.debugResponse(err?.getResponse(), requestUuid);
  }

  private logError(err: { message: any; }) {
    try {
      this.logger.error(JSON.stringify(err));
    } catch (e) {
      this.logger.error(err.message);
    }
  }

  static formatError(error: Error): HttpException {
    const payload: ApiErrorDTO = ApiErrorDTO.builder()
      .code(Errors.GEN000)
      .description(error?.message)
      .build();
    return new HttpException(payload, HttpInterceptor.getErrorStatus(error));
  }

  static getErrorStatus(error: any): number {
    let status: number;
    switch (true) {
      case error instanceof HttpException:
        status = error?.getStatus();
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    return status;
  }
}
