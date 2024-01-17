import { HttpException } from '@nestjs/common';
import { ApiErrorDTO } from './domain/api-error.dto';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

export class ApiRuntimeException extends HttpException {

  constructor(response: ApiErrorDTO, status: HttpStatus) {
    super(response, status);
  }
}
