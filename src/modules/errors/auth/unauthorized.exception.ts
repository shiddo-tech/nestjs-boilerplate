import { ApiRuntimeException } from '../api-runtime-exception';
import { Errors } from '../domain/errors.enum';
import { HttpStatus } from '@nestjs/common';
import { ApiErrorDTO } from '../domain/api-error.dto';

export class UnauthorizedException extends ApiRuntimeException {

  constructor() {
    const response = ApiErrorDTO.builder()
      .code(Errors.AUTH000)
      .description('Invalid credentials.')
      .build();
    super(response, HttpStatus.REQUEST_TIMEOUT);
  }
}
